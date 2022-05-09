/* 
The namespace is used for logical grouping of functionalities. 
A namespace can include interfaces, classes, functions and variables to support a single or a group of related functionalities.
*/
namespace StringUtility {
	export function ToCapital(str: string): string {
		return str.toUpperCase();
	}

	export function SubString(str: string, from: number, length: number = 0): string {
		return str.substr(from, length);
	}
}
// <reference path="StringUtility.ts" />

export class Employee {
	empCode: number;
	empName: string;
	constructor(name: string, code: number) {
		this.empName = StringUtility.ToCapital(name);
		this.empCode = code;
	}

	displayEmployee() {
		console.log(`Employee Code: ${this.empCode}, Employee Name: ${this.empName}`);
	}
}
