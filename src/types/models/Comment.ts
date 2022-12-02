import { CommonAttributes, isCommonAttributes } from "./Common";

// types
export type CommentAttributes = {
  title: string;
  message: string;
  verified: boolean;
};

export type CommentInput = CommentAttributes;
export type CommentOutput = CommentAttributes & CommonAttributes;

// type predicates
export function isCommentAttributes(
  object: unknown
): object is CommentAttributes {
  return (
    (object as CommentAttributes).title !== undefined &&
    (object as CommentAttributes).message !== undefined &&
    (object as CommentAttributes).verified !== undefined
  );
}

export function isCommentInput(object: unknown): object is CommentInput {
  return isCommentAttributes(object);
}

export function isCommentOutput(object: unknown): object is CommentOutput {
  return (
    (object as CommentAttributes).title !== undefined &&
    (object as CommentAttributes).message !== undefined &&
    (object as CommentAttributes).verified !== undefined &&
    isCommonAttributes(object)
  );
}

export function isCommentOutputArray(
  objects: unknown[]
): objects is CommentOutput[] {
  return objects.every((object) => isCommentOutput(object));
}
