import { IMoveable } from './contracts/movable.interface';
import { IStartable } from './contracts/startable.interface';

import { Boat } from './models/boat.model';
import { Car } from './models/car.model';

const boat = new Boat();
const car = new Car();

const moveables: IMoveable[] = [boat, car];
const startables: IStartable[] = [boat, car];

startables.forEach((startable) => startable.start());
moveables.forEach((moveable) => moveable.move());
