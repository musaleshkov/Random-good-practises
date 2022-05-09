import { IMoveable } from '../contracts/movable.interface';
import { IStartable } from '../contracts/startable.interface';

export class Boat implements IMoveable, IStartable {
  public move(): void {
    console.log('Boat is sailing...');
  }

  public start(): void {
    console.log('Boat started the propeller...');
  }
}
