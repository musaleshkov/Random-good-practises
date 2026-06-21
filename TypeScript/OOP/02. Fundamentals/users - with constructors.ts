class User {
	public firstName: string;
	public lastName: string;

	public username: string;
	public email: string;

	constructor(username: string, email: string, firstName: string, lastName: string) {
		this.username = username;
		this.email = email;

		this.firstName = firstName;
		this.lastName = lastName;
	}
}

const userOne = new User("rockstar", "elon.musk@gmail.com", "Elon", "Musk");
// Note: null is intentionally passed to show that constructors without
// validation don't prevent bad data (fixed in the Encapsulation examples)
const userTwo = new User("wardestroyer", "john.baiden@gmail.com", null as unknown as string, "Baiden");

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
});

export {};
