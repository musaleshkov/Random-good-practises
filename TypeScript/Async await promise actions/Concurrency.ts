import { getFruit } from "./Async await";

const makeSmoothieFaster = async (): Promise<string[]> =>
	await Promise.all([getFruit("pineapple") as Promise<string>, getFruit("strawberry") as Promise<string>]);

const fruitRace = async (): Promise<string> =>
	await Promise.race([getFruit("pineapple") as Promise<string>, getFruit("strawberry") as Promise<string>]);

const log = (value: unknown): void => console.log(value);

fruitRace().then(log);
fruitRace().then(log);
fruitRace().then(log);
fruitRace().then(log);
fruitRace().then(log);

export {};