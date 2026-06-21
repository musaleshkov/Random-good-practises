// TypeScript generics make these functions truly reusable
// (the original version was hardcoded to `number[]` only)

// ForEach - generic version
const forEach = <T>(arr: T[], fn: (item: T) => void): void => {
    for (const item of arr) {
        fn(item);
    }
};

// Filter - generic version
const filter = <T>(arr: T[], checkFn: (item: T) => boolean): T[] => {
    const tempArr: T[] = [];
    for (const item of arr) {
        if (checkFn(item)) {
            tempArr.push(item);
        }
    }
    return tempArr;
};

// Map - generic version
const map = <T, U>(arr: T[], modifyFn: (item: T) => U): U[] => {
    const tempArr: U[] = [];
    for (const item of arr) {
        tempArr.push(modifyFn(item));
    }
    return tempArr;
};

// Usage examples
forEach([1, 2, 3], console.log);
forEach(["a", "b", "c"], (s) => console.log(s.toUpperCase()));

const evens = filter([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0);
console.log("Even numbers:", evens);

const doubled = map([1, 2, 3], (n) => n * 2);
console.log("Doubled:", doubled);

const lengths = map(["hello", "world"], (s) => s.length);
console.log("Lengths:", lengths);

export {};