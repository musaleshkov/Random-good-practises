/*
    The above rule, introduced by Barbara Liskov,
    also helps us ensure that changing one area of our system does not break other parts.
    To make this principle less confusing, we will break it down into multiple parts.

    Replacing an instance of a class with its child class should not produce any negative side effects
*/

/*
    Set is a new data structure introduced in ES6, similar to 
    Map(Maps allow us store key-value pairs similar to maps in other programming languages e.g. Java, C#.). 
    It allows you store distinct values into a List similar to other programming languages e.g. Java, C#.
*/

// the following code break the rule

class Employee {
	protected permissions: any = new Set<string>();

	public hasPermission(permissionName: string) {
		return this.permissions.has(permissionName);
	}
	public addPermission(permissionName: string) {
		return this.permissions.add(permissionName);
	}
}
class Cashier extends Employee {
	protected permissions: string[] = [];

	public addPermission(permissionName: string) {
		this.permissions.push(permissionName);
	}
}
function isPersonAllowedToDeleteProducts(person: Employee) {
	return person.hasPermission("deleteProducts");
}
const employee = new Employee();
employee.addPermission("deleteProducts");
isPersonAllowedToDeleteProducts(employee);

const cashier = new Cashier();
cashier.addPermission("deleteProducts");
isPersonAllowedToDeleteProducts(cashier);

// the correct thing

class Employee {
	protected permissions = new Set<string>();

	public addPermission(permissionName: string) {
		return this.permissions.add(permissionName);
	}
}
class Cashier extends Employee {
	public addPermission(permissionName: string) {
		if (permissionName === "deleteProducts") {
			throw new Error("Cashier should not be able to delete products!");
		}
		return this.permissions.add(permissionName);
	}
}
const employee = new Employee();
employee.addPermission("deleteProducts");
const employee = new Cashier();
employee.addPermission("deleteProducts");
