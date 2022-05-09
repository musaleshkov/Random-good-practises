// ForEach
const forEach: (arr: number[], fn: (a: number) => void) => void = (arr: number[], fn: (a: number) => void): void => {
  for (const item of arr) {
    // Call the function
    fn(item);
  }
};

// Filter
const filter: (arr: number[], checkFn: (a: number) => boolean) => number[] = (arr: number[], checkFn: (a: number) => boolean): number[] => {
  const tempArr: number[] = [];
  for (const item of arr) {
    if (checkFn(item)) {
      tempArr.push(item);
    }
  }

  return tempArr;
};

// Map
const map: (arr: number[], modifyFn: (a: number) => number) => number[] = (arr: number[], modifyFn: (a: number) => number): number[] => {
  const tempArr: number[] = [];
  for (const item of arr) {
    const modified: number = modifyFn(item);
    tempArr.push(modified);
  }

  return tempArr;
};

forEach([1, 2, 3], console.log);
