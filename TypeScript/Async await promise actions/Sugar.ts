import { getFruit } from "./Async await";

const fruits = ["peach", "pineapple", "strawberry"];

const fruitLoop = async (): Promise<void> => {
	for (const fruit of fruits) {
		// logs emoji
		const result = await getFruit(fruit);
		console.log(result);
	}
};

const fruitInspection = async (): Promise<void> => {
	const result = await getFruit("peach");
	if (result === "🍑") {
		console.log("looks peachy!");
	}
};

// Note: HTTP fetching with native fetch() (Node 18+)
const getTodo = async (): Promise<void> => {
	try {
		const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
		const json = await res.json() as { title: string; userId: number; completed: boolean };
		const { title, userId, completed } = json;
		console.log(title, userId, completed);
	} catch (err) {
		console.error("Failed to fetch todo:", err);
	}
};

// Export to run
export { fruitLoop, fruitInspection, getTodo };