import { NextFunction, Request, Response } from "express";
import { Comment } from "../../models/Comment";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";

export async function LoadComment(request: Request, response: Response, next: NextFunction) {

	const commentId = parseInt(request.params?.commentId);

	if(!commentId) {
		next({ message: "No id provided", code: 400, name: "NoIdProvidedError" } as NoIdProvidedError);
		return;
	}

	const comment = await Comment.findByPk(commentId);

	if(!comment) {
		next({ message: "No comment found", code: 404, name: "InexistantResourceError" } as InexistantResourceError);
		return;
	}

	response.locals.comment = comment;

	next();
}