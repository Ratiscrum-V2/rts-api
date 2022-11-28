// type
export interface CommonAttributes {
    id: number;
    createdAt?: Date;
    updatedAt?: Date; 
}

// type predicates
export function isCommonAttributes(object: unknown): object is CommonAttributes {
	return (
		(object as CommonAttributes).id !== undefined
	);
}