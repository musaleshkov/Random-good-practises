import { IMoveable } from '../contracts/movable.interface';
import { IStartable } from '../contracts/startable.interface';

export class Car implements IMoveable, IStartable {
  public move(): void {
    console.log('Car is moving...');
  }

  public start(): void {
    console.log('Car started the engine...');
  }
}
