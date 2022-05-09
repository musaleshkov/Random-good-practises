class User {
	public username: string;
	public email: string;

	public firstName: string;
	public lastName: string;
}

const userOne = new User();
userOne.username = "rockstar";
userOne.email = "elon.musk@gmail.com";
userOne.firstName = "Elon";
userOne.lastName = "Musk";

const userTwo = new User();
userTwo.username = "wardestroyer";
userTwo.email = "john.baiden@gmail.com";
userTwo.firstName = "John";
userTwo.lastName = "Baiden";

const displayUser = (user: User) => {
	console.log(user.username);
	console.log(user.email);
	console.log();
};

displayUser(userOne);
displayUser(userTwo);

displayUser({
	username: "gTheEagle",
	email: "george.eagle@gmail.com",
	firstName: "George",
	lastName: "Eagle",
} as User);
