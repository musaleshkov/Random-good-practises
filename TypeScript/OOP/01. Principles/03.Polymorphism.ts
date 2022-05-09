// Polymorphism

interface IAnimal {
	eat(): void;
}

class Cat implements IAnimal {
	public eat(): void {
		console.log(`Meow!`);
	}
}

class Dog implements IAnimal {
	public eat(): void {
		console.log(`Bark!`);
	}
}

class AnimalFeeder {
	public feed(animal: IAnimal): void {
		animal.eat();
	}
}

new Cat().eat();
new Dog().eat();

new AnimalFeeder().feed(new Dog());
new AnimalFeeder().feed(new Cat());

const cat = new Cat();
const dog = new Dog();

const animals: IAnimal[] = [cat, dog];

animals.forEach((animal: IAnimal) => {
	animal.eat;
});
