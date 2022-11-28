interface StringEnumObject {
	[enumValue: string]: string
}

interface NumberEnumObject {
	[enumValue: number]: string
}

export function getEnumValues(e: StringEnumObject | NumberEnumObject): (string | number)[] {
	
	const values = Object.values(e);

	if(values.some(v => typeof v === "number")) {
		return values.filter( v => typeof v === "number" );
	}
	else {
		return values.filter( v => typeof v === "string" );
	}
}