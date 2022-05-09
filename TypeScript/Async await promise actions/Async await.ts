// Basic
export const getFruit = async (name) => {
	const fruits = {
		pineapple: "🍍",
		peach: "🍑",
		strawberry: "🍓",
	};

	return fruits[name];
};

getFruit("peach").then(console.log);

// Async + Await
export const makeSmoothie = async () => [await getFruit("pineapple"), await getFruit("strawberry")];
