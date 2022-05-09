import { Airplane } from './airplane.model';
import { Color } from './color.enum';
import { Dealership } from './dealership.model';

const dealership = new Dealership();

const airbus = new Airplane('Airbus', Color.White, 2);
const boeing = new Airplane('Boeing', Color.White, 4);

dealership.addAirplane(airbus);
dealership.addAirplane(boeing);
console.table(dealership.Airplanes);

dealership.Airplanes.push(new Airplane('SpaceX', Color.White, 1));
console.table(dealership.Airplanes);

dealership.Airplanes[0].manufacturer = 'Bombardier';
console.table(dealership.Airplanes);
