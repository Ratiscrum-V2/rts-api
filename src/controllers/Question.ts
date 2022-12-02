import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { Question } from "../models/Question";
import InvalidBodyError from "../types/errors/InvalidBodyError";
import { isQuestionInput, QuestionInput } from "../types/models/Question";

export async function createQuestion(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  if(!isQuestionInput(request.body))
		return next({ message: "Invalid body error", code: 400, name: "InvalidBodyError" } as InvalidBodyError);

  let question: Question;
  
  try {
    question = await Question.create(request.body);
  } catch (error) {
    if (error instanceof ValidationError)
      return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);
    
      return next(error);
  }

  response.json(question);
  return;
}

export async function getQuestion(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  response.json(response.locals.question);
}

export async function updateQuestion(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  const question: Question = response.locals.question;
	const newAttributes: Partial<QuestionInput> = request.body;

	try {
		await question.update(newAttributes);
	}
	catch(error) {
		if(error instanceof ValidationError)
			return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);

		return next(error);
	}

	response.json(question);
}

export async function deleteQuestion(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  const question = response.locals.question;
	await question.destroy();
	response.json({ message: "Question deleted" });
}

