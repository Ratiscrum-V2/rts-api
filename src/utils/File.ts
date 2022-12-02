export function slugify(text: string): string {
	return text.replace(/\s|_|\(|\)/g, "-")
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase();
}
