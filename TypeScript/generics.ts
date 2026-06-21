/* Generics offer a way to create reusable components.
 Generics provide a way to make components work with any data type and not restrict to one data type.
 So, components can be called or used with a variety of data types. Generics in TypeScript is almost similar to C# generics.
*/
function getArray(items: any[]): any[] {
    return new Array().concat(items);
}

let myNumArr = getArray([100, 200, 300]);
let myStrArr = getArray(["Hello", "World"]);

myNumArr.push(400); // OK
myStrArr.push("Hello TypeScript"); // OK

myNumArr.push("Hi"); // OK (no type safety with `any`)
myStrArr.push(500); // OK (no type safety with `any`)

console.log(myNumArr); // [100, 200, 300, 400, "Hi"]
console.log(myStrArr); // ["Hello", "World", "Hello TypeScript", 500]

function getGenerics<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

let myNumGen = getGenerics<number>([100, 200, 300]);
let myStrGen = getGenerics<string>(["Hello", "World"]);

myNumGen.push(400); // OK
myStrGen.push("Hello TypeScript"); // OK

// myNumGen.push("Hi"); // Compiler Error - Argument of type 'string' is not assignable to parameter of type 'number'
// myStrGen.push(500); // Compiler Error - Argument of type 'number' is not assignable to parameter of type 'string'

console.log(myNumGen); // [100, 200, 300, 400]
console.log(myStrGen); // ["Hello", "World", "Hello TypeScript"]

// Generic Interface as Function Type
interface IKeyValueProcessor<T, U> {
    process(key: T, val: U): void;
};

class kvProcessor implements IKeyValueProcessor<number, string>
{
    process(key: number, val: string): void {
        console.log(`Key = ${key}, val = ${val}`);
    }
}

let proc: IKeyValueProcessor<number, string> = new kvProcessor();

// Generic Class implements Generic Interface
interface IKeyValueProcessor2<T, U> {
    process(key: T, val: U): void;
};

class kvProcessor2<T, U> implements IKeyValueProcessor2<T, U>
{
    process(key: T, val: U): void {
        console.log(`Key = ${key}, val = ${val}`);
    }
}

let proc2: IKeyValueProcessor2<number, string> = new kvProcessor2();
proc.process(1, 'Bill');     // Output: Key = 1, val = Bill
proc2.process(2, 'Steve');   // Output: Key = 2, val = Steve