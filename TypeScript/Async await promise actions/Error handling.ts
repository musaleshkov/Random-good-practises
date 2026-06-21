import { getFruit } from "./Async await";

const badSmoothie = async (): Promise<string[] | string> => {
	try {
		return await Promise.all([
			getFruit("pineapple") as Promise<string>,
			getFruit("strawberry") as Promise<string>,
		]);
	} catch (err) {
		console.error("Smoothie failed:", err);
		// Best practice: throw an Error object, not a string
		throw new Error(`It's broken! Cause: ${err}`);
	}
};

export {};