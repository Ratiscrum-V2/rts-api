export function getRandomInt(max: number) {
	if (!max)
		throw new Error("Pas d'argument envoyé");

	return Math.floor(Math.random() * Math.floor(max));
}
