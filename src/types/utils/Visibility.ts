export type Visibility = "public" | "private";

export function isVisibility(object: unknown): object is Visibility {
	return(
		object === "public" ||
		object === "private"
	);
}