import { IMoveable } from '../contracts/movable.interface';
import { IStartable } from '../contracts/startable.interface';

export class Boat implements IMoveable, IStartable {
  constructor(private name: string) {}

  public move(): void {
    console.log(`${this.name} is sailing at ${this.getSpeed()} knots...`);
  }

  public start(): void {
    console.log(`${this.name}: Starting propeller (fuel: ${this.getFuelType()})...`);
  }

  public getSpeed(): number {
    return 30; // knots
  }

  public getFuelType(): string {
    return 'diesel';
  }
}