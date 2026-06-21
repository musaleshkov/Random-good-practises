/* 
The namespace is used for logical grouping of functionalities. 
A namespace can include interfaces, classes, functions and variables 
to support a single or a group of related functionalities.

Note: In modern TypeScript, ES modules (import/export) are preferred
over namespaces for code organization. Namespaces are still useful
for internal module patterns and global script scenarios.
*/
namespace StringUtility {
	export function ToCapital(str: string): string {
		return str.toUpperCase();
	}

	export function SubString(str: string, from: number, length: number = 0): string {
		// substr() is deprecated — use substring() or slice() instead
		return str.substring(from, from + length);
	}
}

// In a separate file, you would reference this namespace with:
// /// <reference path="StringUtility.ts" />

class Employee {
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

const emp = new Employee("john", 101);
emp.displayEmployee(); // Employee Code: 101, Employee Name: JOHN