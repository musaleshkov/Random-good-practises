import { IMoveable } from '../contracts/movable.interface';
import { IStartable } from '../contracts/startable.interface';

export class Car implements IMoveable, IStartable {
  constructor(private name: string) {}

  public move(): void {
    console.log(`${this.name} is driving at ${this.getSpeed()} km/h...`);
  }

  public start(): void {
    console.log(`${this.name}: Starting engine (fuel: ${this.getFuelType()})...`);
  }

  public getSpeed(): number {
    return 120; // km/h
  }

  public getFuelType(): string {
    return 'gasoline';
  }
}