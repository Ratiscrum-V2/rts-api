import { CommonAttributes, isCommonAttributes } from "./Common";

// types
export type QuestionAttributes = {
  title: string;
  description?: string;
  medias: number[];
};

export type QuestionInput = QuestionAttributes;
export type QuestionOutput = QuestionAttributes & CommonAttributes;

// type predicates
export function isQuestionAttributes(
  object: unknown
): object is QuestionAttributes {
  return (
    (object as QuestionAttributes).title !== undefined &&
    (object as QuestionAttributes).medias !== undefined
  );
}

export function isQuestionInput(object: unknown): object is QuestionInput {
  return isQuestionAttributes(object);
}

export function isQuestionOutput(object: unknown): object is QuestionOutput {
  return (
    (object as QuestionAttributes).title !== undefined &&
    (object as QuestionAttributes).medias !== undefined &&
    isCommonAttributes(object)
  );
}

export function isQuestionOutputArray(
  objects: unknown[]
): objects is QuestionOutput[] {
  return objects.every((object) => isQuestionOutput(object));
}
