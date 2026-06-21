class Person {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	eat(): void {
		console.log(`${this.name} eats when hungry.`);
	}
}

class Student extends Person {
	// variables
	rollNumber: number;

	// constructors
	constructor(rollNumber: number, name: string) {
		super(name); // calling Parent's constructor
		this.rollNumber = rollNumber;
	}

	// functions
	displayInformation(): void {
		console.log(`Name: ${this.name}, Roll Number: ${this.rollNumber}`);
	}

	// overriding super class method
	eat(): void {
		console.log(`${this.name} eats during break.`);
	}
}

const student1 = new Student(2, "Rohit");

student1.displayInformation();
student1.eat();

export {};
