import { CommonAttributes, isCommonAttributes } from "./Common";
import { StringEnumObject } from "../utils/Enum";

// types
export type ChoiceAttributes = {
  label: string;
  value: string;
  effects: StringEnumObject;
};

export type ChoiceInput = ChoiceAttributes;
export type ChoiceOutput = ChoiceAttributes & CommonAttributes;

// type predicates
export function isChoiceAttributes(
  object: unknown
): object is ChoiceAttributes {
  return (
    (object as ChoiceAttributes).label !== undefined &&
    (object as ChoiceAttributes).value !== undefined &&
    (object as ChoiceAttributes).effects !== undefined
  );
}

export function isChoiceInput(object: unknown): object is ChoiceInput {
  return isChoiceAttributes(object);
}

export function isChoiceOutput(object: unknown): object is ChoiceOutput {
  return (
    isChoiceAttributes(object) && isCommonAttributes(object)
  );
}

export function isChoiceOutputArray(
  objects: unknown[]
): objects is ChoiceOutput[] {
  return objects.every((object) => isChoiceOutput(object));
}
