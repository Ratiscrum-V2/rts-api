import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { Choice } from "../models/Choice";
import InvalidBodyError from "../types/errors/InvalidBodyError";
import { isChoiceInput, ChoiceInput } from "../types/models/Choice";

export async function createChoice(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  if(!isChoiceInput(request.body))
		return next({ message: "Invalid body error", code: 400, name: "InvalidBodyError" } as InvalidBodyError);

  let choice: Choice;
  
  try {
    choice = await Choice.create(request.body);
  } catch (error) {
    if (error instanceof ValidationError)
      return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);
    
      return next(error);
  }

  response.json(choice);
  return;
}

export async function getChoice(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  response.json(response.locals.choice);
}

export async function updateChoice(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  const choice: Choice = response.locals.choice;
	const newAttributes: Partial<ChoiceInput> = request.body;

	try {
		await choice.update(newAttributes);
	}
	catch(error) {
		if(error instanceof ValidationError)
			return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);

		return next(error);
	}

	response.json(choice);
}

export async function deleteChoice(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  const choice = response.locals.choice;
	await choice.destroy();
	response.json({ message: "Choice deleted" });
}

