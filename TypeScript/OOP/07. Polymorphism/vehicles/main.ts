import { IMoveable } from './contracts/movable.interface';
import { IStartable } from './contracts/startable.interface';

import { Boat } from './models/boat.model';
import { Car } from './models/car.model';

// Polymorphism: same interface, different behavior
const titanic = new Boat('Titanic');
const ferrari = new Car('Ferrari');

// Polymorphic collection — both are IMoveable AND IStartable
const vehicles: (IMoveable & IStartable)[] = [titanic, ferrari];

console.log('=== Starting all vehicles ===');
vehicles.forEach((v) => v.start());

console.log('\n=== Moving all vehicles ===');
vehicles.forEach((v) => v.move());

// Polymorphic function — works with any IStartable
function performSafetyCheck(vehicle: IStartable): void {
  console.log(`\nSafety check: fuel type = ${vehicle.getFuelType()}`);
  vehicle.start();
}

performSafetyCheck(titanic);
performSafetyCheck(ferrari);

export {};