import { CommonAttributes, isCommonAttributes } from "./Common";

// types
export type UserAttributes = {
  email: string;
  nickname: string;
  hashedPassword: string;
  TWOFAtoken?: string;
};

export type UserInput = UserAttributes;
export type UserOutput = Omit<UserAttributes, "hashedPassword" | "TWOFAtoken"> &
  CommonAttributes;

// type predicates
export function isUserAttributes(object: unknown): object is UserAttributes {
  return (
    (object as UserAttributes).email !== undefined &&
    (object as UserAttributes).nickname !== undefined &&
    (object as UserAttributes).hashedPassword !== undefined
  );
}

export function isUserInput(object: unknown): object is UserInput {
  return isUserAttributes(object);
}

export function isUserOutput(object: unknown): object is UserOutput {
  return (
    (object as UserOutput).email !== undefined &&
    (object as UserOutput).nickname !== undefined &&
    isCommonAttributes(object)
  );
}

export function isUserOutputArray(objects: unknown[]): objects is UserOutput[] {
  return objects.every((object) => isUserOutput(object));
}
