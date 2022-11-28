import { EncodedSession, isEncodedSession } from "./Session";

// types
export type ApiResponse = {
	message: string;
}

export type SuccessLoginResponse = ApiResponse & {
	session: EncodedSession;
	email: string;
}

// types predicate
export function isApiResponse(object: unknown): object is ApiResponse {
	return (
		(object as ApiResponse).message !== undefined
	);
}

export function isSuccessLoginResponse(object: unknown): object is SuccessLoginResponse {
	return (
		isApiResponse(object) &&
		isEncodedSession((object as SuccessLoginResponse).session) &&
		(object as SuccessLoginResponse).email !== undefined
	);
}