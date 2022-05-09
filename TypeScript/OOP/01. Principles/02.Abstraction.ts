/* 
	Abstract classes are mainly for inheritance where other classes may derive from them. 
	We cannot create an instance of an abstract class.
*/

abstract class Animal {
	private name: string;

	public sayName(): string {
		return this.name;
	}

	public abstract speak(): void;
}

class Dog extends Animal {
	public sayName(): string {
		return `Bark! ${super.sayName()}`;
	}

	public speak(): void {
		console.log("Bark!");
	}
}

class Cat extends Animal {
	public speak(): void {
		console.log("Meow!");
	}
}

interface IVehicle {
	move(): void;
}

class Car implements IVehicle {
	public move(): void {
		console.log("drive");
	}
}

class Boat implements IVehicle {
	public move(): void {
		console.log("sail");
	}
}
// interfaces are more abstract
