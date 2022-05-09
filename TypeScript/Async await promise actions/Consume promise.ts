import fetch from "node-fetch";

const promise = fetch("https://jsonplaceholder.typicode.com/todos/1");

promise
	.then((res) => res.json())
	.then((todo) => console.log("😛", todo.title))
	.catch((err) => console.error("😭", err));

console.log("Synchronous");
