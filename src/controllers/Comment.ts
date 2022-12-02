import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { Comment } from "../models/Comment";
import InvalidBodyError from "../types/errors/InvalidBodyError";
import { isCommentInput, CommentInput } from "../types/models/Comment";

export async function createComment(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  if(!isCommentInput(request.body))
		return next({ message: "Invalid body error", code: 400, name: "InvalidBodyError" } as InvalidBodyError);

  let comment: Comment;
  
  try {
    comment = await Comment.create(request.body);
  } catch (error) {
    if (error instanceof ValidationError)
      return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);
    
      return next(error);
  }

  response.json(comment);
  return;
}

export async function getComment(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  response.json(response.locals.comment);
}

export async function updateComment(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  const comment: Comment = response.locals.comment;
	const newAttributes: Partial<CommentInput> = request.body;

	try {
		await comment.update(newAttributes);
	}
	catch(error) {
		if(error instanceof ValidationError)
			return next({ message: error.message, code: 400, name: "InvalidBodyError" } as InvalidBodyError);

		return next(error);
	}

	response.json(comment);
}

export async function deleteComment(request: Request, response: Response, next: NextFunction): Promise<void> 
{
  const comment = response.locals.comment;
	await comment.destroy();
	response.json({ message: "Comment deleted" });
}

