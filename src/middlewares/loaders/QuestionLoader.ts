import { NextFunction, Request, Response } from "express";
import { Question } from "../../models/Question";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";

export async function LoadQuestion(request: Request, response: Response, next: NextFunction) {

	const questionId = parseInt(request.params?.questionId);

	if(!questionId) {
		next({ message: "No id provided", code: 400, name: "NoIdProvidedError" } as NoIdProvidedError);
		return;
	}

	const question = await Question.findByPk(questionId);

	if(!question) {
		next({ message: "No question found", code: 404, name: "InexistantResourceError" } as InexistantResourceError);
		return;
	}

	response.locals.question = question;

	next();
}