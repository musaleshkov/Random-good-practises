/* 
The interface segregation principle puts an emphasis on creating smaller and more specific interfaces. 
Let’s imagine the following situation.
*/
// imagine if kiwi should fly... thats why we need smaller pieces the break is here:
interface Bird {
	fly(): void;
	walk(): void;
}
class Nightingale implements Bird {
	public fly() {
		/// ...
	}
	public walk() {
		/// ...
	}
}
class Kiwi implements Bird {
	public fly() {
		throw new Error("Unfortunately, Kiwi can not fly!");
	}
	public walk() {
		/// ...
	}
}
// Correct way
interface CanWalk {
	walk(): void;
}
interface CanFly {
	fly(): void;
}
class Nightingale implements CanFly, CanWalk {
	public fly() {
		/// ...
	}
	public walk() {
		/// ...
	}
}
class Kiwi implements CanWalk {
	public walk() {
		/// ...
	}
}
