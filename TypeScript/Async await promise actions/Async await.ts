// Basic async function returning a Promise
export const getFruit = async (name: string): Promise<string | undefined> => {
	const fruits: Record<string, string> = {
		pineapple: "🍍",
		peach: "🍑",
		strawberry: "🍓",
	};

	return fruits[name];
};

getFruit("peach").then(console.log);

// Async + Await
export const makeSmoothie = async (): Promise<string[]> => [
	await getFruit("pineapple") as string,
	await getFruit("strawberry") as string,
];

export {};