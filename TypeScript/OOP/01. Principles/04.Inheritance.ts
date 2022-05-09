/*
	is-a relation ship dog-is-animal
	has-a - compassion object to the dog
	derived all protected and public from base class
	high coupling here
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
	private _bread: string;
	public constructor(age: number, bread: string) {
		super(age);
		this._bread = bread;
	}

	public get bread(): string {
		return (this._bread = bread);
	}

	public wagTail(): void {
		console.log("Tail wagging");
	}

	public sleep(): void {
		console.log("** dog dreams **");
		super.sleep();
	}
}
