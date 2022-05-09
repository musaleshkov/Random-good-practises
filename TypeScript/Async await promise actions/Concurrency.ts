import { getFruit } from "./3-async-await";

const makeSmoothieFaster = async () =>
	await Promise.all([getFruit("pineapple"), getFruit("strawberry")]);

const fruitRace = async () => await Promise.race([getFruit("pineapple"), getFruit("strawberry")]);

fruitRace().then(log);
fruitRace().then(log);
fruitRace().then(log);
fruitRace().then(log);
fruitRace().then(log);
