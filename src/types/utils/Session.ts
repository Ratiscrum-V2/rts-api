export interface Session {
	id: number,
	username: string,
	dateCreated: number,
	issued: number,
	expires: number
}

export type PartialSession = Omit<Session, "issued" | "expires">

export interface EncodedSession {
	token: string,
	expires: number,
	issued: number
}

export type DecodedSession = | { type: "valid", session: Session } | { type: "integrity-error" } | { type: "invalid-token" };

// active : le token est toujours valide
// grace : le token n'est plus valide mais peut être renouvellé
// expired : le token n'est plus valide et ne peut pas être renouvellé, l'utilisateur doit se reconnecter
export type ExpirationStatus = "expired" | "active" | "grace";



// predicates
export function isEncodedSession(object: unknown): object is EncodedSession {
	return (
		(object as EncodedSession).token !== undefined && 
		(object as EncodedSession).issued !== undefined && 
		(object as EncodedSession).expires !== undefined 
	);
}