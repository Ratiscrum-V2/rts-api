import { CommonAttributes, isCommonAttributes } from "./Common";

// types
export type UserAttributes = {
    email: string;
	firstName: string;
	lastName: string;
};

export type UserInput = UserAttributes & { 
	hashedPassword: string; 
};
export type UserOutput = UserAttributes & CommonAttributes;
export type Author = Omit<UserAttributes, "email"> & { id: number };

// type predicates
export function isUserAttributes(object: unknown): object is UserAttributes {
	return (
		(object as UserAttributes).email !== undefined &&
		(object as UserAttributes).firstName !== undefined &&
		(object as UserAttributes).lastName !== undefined
	);
}

export function isAuthor(object: unknown): object is Author {
	return (
		(object as Author).id !== undefined &&
		(object as Author).firstName !== undefined &&
		(object as Author).lastName !== undefined
	);
}

export function isUserInput(object: unknown): object is UserInput {
	return (
		isUserAttributes(object) &&
		(object as UserInput).hashedPassword !== undefined
	);
}

export function isUserOutput(object: unknown): object is UserOutput {
	return (
		isUserAttributes(object) &&
		isCommonAttributes(object)
	);
}

export function isUserOutputArray(objects: unknown[]): objects is UserOutput[] {
	return objects.every( object => isUserOutput(object) );
}