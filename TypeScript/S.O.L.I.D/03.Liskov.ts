/*
    The Liskov Substitution Principle, introduced by Barbara Liskov,
    ensures that changing one area of our system does not break other parts.

    Replacing an instance of a class with its child class
    should not produce any negative side effects.
*/

/*
    Set is a data structure introduced in ES6, similar to
    Map (key-value pairs). It allows you to store distinct
    values into a collection similar to C# or Java sets.
*/

// ❌ INCORRECT: The following code breaks the principle
// Changing the internal data structure (Set → Array) in the child class
// silently breaks the parent's hasPermission() behavior.

class BadEmployee {
    protected permissions: any = new Set<string>();

    public hasPermission(permissionName: string) {
        return this.permissions.has(permissionName);
    }
    public addPermission(permissionName: string) {
        return this.permissions.add(permissionName);
    }
}
class BadCashier extends BadEmployee {
    protected permissions: string[] = [];

    public addPermission(permissionName: string) {
        this.permissions.push(permissionName);
    }
}
function isPersonAllowedToDeleteProducts(person: BadEmployee) {
    return person.hasPermission("deleteProducts");
}

const badEmployee = new BadEmployee();
badEmployee.addPermission("deleteProducts");
isPersonAllowedToDeleteProducts(badEmployee); // true ✓

const badCashier = new BadCashier();
badCashier.addPermission("deleteProducts");
// isPersonAllowedToDeleteProducts(badCashier); // false ✗ — breaks LSP! Array doesn't have .has()

// ✅ CORRECT: Preserve the parent's contract (Set) and add business rule

class Employee {
    protected permissions = new Set<string>();

    public addPermission(permissionName: string) {
        return this.permissions.add(permissionName);
    }

    public hasPermission(permissionName: string) {
        return this.permissions.has(permissionName);
    }
}

class Cashier extends Employee {
    public addPermission(permissionName: string) {
        if (permissionName === "deleteProducts") {
            throw new Error(
                "Cashier should not be able to delete products!"
            );
        }
        return this.permissions.add(permissionName);
    }
}

const employee = new Employee();
employee.addPermission("deleteProducts");
console.log("Employee can delete:", employee.hasPermission("deleteProducts")); // true

const cashier = new Cashier();
cashier.addPermission("viewProducts");
console.log("Cashier can view:", cashier.hasPermission("viewProducts")); // true

try {
    cashier.addPermission("deleteProducts");
} catch (e) {
    const error = e as Error;
    console.error(error.message); // "Cashier should not be able to delete products!"
}

export {};