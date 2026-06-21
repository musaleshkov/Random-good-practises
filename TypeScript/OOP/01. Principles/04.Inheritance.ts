/*
	is-a relationship: dog-is-a-mammal
	has-a: composition (object contained within the dog)
	Derived class inherits all protected and public members from base class.
	Note: high coupling exists in this pattern.
*/
class Mammal {
	private _age: number;

	public constructor(age: number) {
		this._age = age;
	}
	public get age(): number {
		return this._age;
	}

	public sleep(): void {
		console.log("Shhh! I'm sleeping");
	}
}

class Dog extends Mammal {
	private _breed: string;
	public constructor(age: number, breed: string) {
		super(age);
		this._breed = breed;
	}

	public get breed(): string {
		return this._breed;
	}

	public wagTail(): void {
		console.log("Tail wagging");
	}

	public sleep(): void {
		console.log("** dog dreams **");
		super.sleep();
	}
}

const myDog = new Dog(3, "Golden Retriever");
console.log(`Age: ${myDog.age}, Breed: ${myDog.breed}`);
myDog.sleep();
myDog.wagTail();

export {};
