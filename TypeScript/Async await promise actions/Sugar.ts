import { getFruit } from "./3-async-await";
import fetch from "node-fetch";

const fruits = ["peach", "pineapple", "strawberry"];

const fruitLoop = async () => {
	for (const fruit of fruits) {
		// logs emoji
		console.log(await getFruit(fruit));
	}
};

const fruitInspection = async () =>
	(await getFruit("peach")) === "🍑" && console.log("looks peachy!");

const getTodo = async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
	const { title, userId, body } = await res.json();

	console.log(title, userId, body);
};
