import { getFruit } from "./Async await";

const badSmoothie = async () => {
	try {
		return await Promise.all([getFruit("pineapple"), getFruit("strawberry")]);
	} catch (err) {
		console.log(err);
		throw `It's broken!`;
	}
};
