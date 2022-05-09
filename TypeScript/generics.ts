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

myNumArr.push("Hi"); // OK
myStrArr.push(500); // OK

console.log(myNumArr); // [100, 200, 300, 400, "Hi"]
console.log(myStrArr); // ["Hello", "World", "Hello TypeScript", 500]

function getGenerics<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

let myNumGen = getGenerics<number>([100, 200, 300]);
let myStrGen = getGenerics<string>(["Hello", "World"]);

myNumArr.push(400); // OK
myStrArr.push("Hello TypeScript"); // OK

myNumArr.push("Hi"); // Compiler Error
myStrArr.push(500); // Compiler Error

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

// Generic Class implements Generic Interface Copy
interface IKeyValueProcesor<T, U> {
    process(key: T, val: U): void;
};

class kvProcesor<T, U> implements IKeyValueProcesor<T, U>
{
    process(key: T, val: U): void {
        console.log(`Key = ${key}, val = ${val}`);
    }
}

let procc: IKeyValueProcesor<number, string> = new kvProcesor();
proc.process(1, 'Bill'); //Output: processKeyPairs: key = 1, value = Bill 