import { Airplane } from './airplane.model';
import { Car } from './car.model';
import { Color } from './color.enum';
import { Dealership } from './dealership.model';

const dealership = new Dealership();
dealership.name = 'Sky High Motors';

const airbus = new Airplane('Airbus', Color.White, 2);
const boeing = new Airplane('Boeing', Color.White, 4);
const tesla = new Car('Tesla', Color.Red, 4);
const ford = new Car('Ford', Color.Blue, 4);

// ✅ Use proper add methods (not mutating getter copies)
dealership.addAirplane(airbus);
dealership.addAirplane(boeing);
dealership.addCar(tesla);
dealership.addCar(ford);

console.log(`Dealership: ${dealership.name}`);
console.log('\nAirplanes:');
console.table(dealership.Airplanes);

console.log('\nCars:');
console.table(dealership.Cars);

// ✅ Mutate through the setter (this does work on the original object)
dealership.Airplanes[0]!.manufacturer = 'Bombardier';
console.log('\nAfter rename:');
console.table(dealership.Airplanes);