import { AWSError, S3 } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { NextFunction, Request, Response } from "express";
import { Blob } from "node:buffer";
import { ValidationError } from "sequelize";
import { Readable } from "stream";
import FileManagement from "../core/FileManagement";
import { FileMetadata } from "../models/FileMetadata";
import InvalidBodyError from "../types/errors/InvalidBodyError";
import { isFileMetadataInput } from "../types/models/File";

export async function uploadFile(request: Request, response: Response, next: NextFunction) {
	const file = request.files?.file;

	if(Array.isArray(file) || file === undefined)
		return next({ message: "Only one file at the time", code: 400, name: "InvalidBodyError" } as InvalidBodyError);
	
	if(!isFileMetadataInput(request.body))
		return next({ message: "Invalid body error", code: 400, name: "InvalidBodyError" } as InvalidBodyError);
	
	let fileMetadata: FileMetadata;

	try {
		fileMetadata = await FileMetadata.create(request.body);
	} 
	catch(error) {
		if(error instanceof ValidationError)
			return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);
		
		return next(error);
	}

	if(!process.env.S3_BUCKETNAME) {
		throw new Error("No S3_BUCKETNAME provided");
	}

	try {
		await FileManagement.get().uploadFile(fileMetadata, process.env.S3_BUCKETNAME, file.data);
	}
	catch(error) {
		return next(error);
	}

	response.json(fileMetadata);
}

export async function getFileMetadata(request: Request, response: Response) {
	response.json(response.locals.fileMetadata);
}

export async function getFile(request: Request, response: Response, next: NextFunction) {
	const metadata: FileMetadata = response.locals.fileMetadata;

	if(!process.env.S3_BUCKETNAME) {
		throw new Error("No S3_BUCKETNAME provided");
	}

	let res: PromiseResult<S3.GetObjectOutput, AWSError>;
	try {
		res = await FileManagement.get().getFile(metadata.id.toString(), process.env.S3_BUCKETNAME);
	}
	catch(error) {
		return next(error);
	}

	let fileData: Buffer;

	if(res.Body instanceof Blob) {
		fileData = Buffer.from(await res.Body.arrayBuffer());
	}
	else if(res.Body instanceof Readable) {
		fileData = await new Promise((resolve, reject) => {
			
			const bufs: Buffer[] = [];

			(res.Body as Readable).on("data", data => { bufs.push(data); });

			(res.Body as Readable).on("end", () => {
				resolve(Buffer.concat(bufs));
			});

			(res.Body as Readable).on("error", err => {
				reject(err);
			});
		});
	}
	else {
		fileData = Buffer.from(res.Body as Buffer | Uint8Array | string);
	}

	response.setHeader("Content-Type", metadata.mimeType);
	response.setHeader("Content-Length", fileData.length);

	response.status(200).send(fileData);
}

export async function updateMetadata(request: Request, response: Response, next: NextFunction) {
	const metadata: FileMetadata = response.locals.fileMetadata;
	const newAttributes: Partial<FileMetadata> = request.body;

	let meta;
	try {
		meta = await metadata.update(newAttributes);
	}
	catch(error) {
		if(error instanceof ValidationError)
			return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);
		
		return next(error);
	}

	response.json(meta);
}

export async function deleteFile(request: Request, response: Response) {
	const metadata: FileMetadata = response.locals.fileMetadata;
	
	if(!process.env.S3_BUCKETNAME) {
		throw new Error("No S3_BUCKETNAME provided");
	}

	await FileManagement.get().deleteFile(metadata.id.toString(), process.env.S3_BUCKETNAME);

	await metadata.destroy();

	response.json({ message: "File deleted" });
}
