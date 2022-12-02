import { NextFunction, Request, Response } from "express";
import { Choice } from "../../models/Choice";
import InexistantResourceError from "../../types/errors/InexistantResourceError";
import NoIdProvidedError from "../../types/errors/NoIdProvidedError";

export async function LoadChoice(request: Request, response: Response, next: NextFunction) {

	const choiceId = parseInt(request.params?.choiceId);

	if(!choiceId) {
		next({ message: "No id provided", code: 400, name: "NoIdProvidedError" } as NoIdProvidedError);
		return;
	}

	const choice = await Choice.findByPk(choiceId);

	if(!choice) {
		next({ message: "No choice found", code: 404, name: "InexistantResourceError" } as InexistantResourceError);
		return;
	}

	response.locals.choice = choice;

	next();
}