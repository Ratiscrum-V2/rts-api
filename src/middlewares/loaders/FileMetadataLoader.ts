import { NextFunction, Request, Response } from "express";
import { FileMetadata } from "../../models/FileMetadata";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";


export async function LoadFileMetadata(request: Request, response: Response, next: NextFunction) {

	const fileId = parseInt(request.params?.fileId);

	if(!fileId) {
		next({ message: "No id provided", code: 400, name: "NoIdProvidedError" } as NoIdProvidedError);
		return;
	}

	let fileMetadata;
	
	if(fileId) {
		fileMetadata = await FileMetadata.findByPk(fileId);
	}

	if(!fileMetadata) {
		next({ message: "No fileMetada found", code: 404, name: "InexistantResourceError" } as InexistantResourceError);
		return;
	}

	response.locals.fileMetadata = fileMetadata;

	next();
}