import { Airplane } from './airplane.model';
import { Car } from './car.model';

export class Dealership {
  private _name: string = 'Default Dealership';

  private readonly _cars: Car[] = [];
  private readonly _airplanes: Airplane[] = [];

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  // Returns a shallow copy to protect internal state
  public get Cars(): readonly Car[] {
    return [...this._cars];
  }

  public get Airplanes(): readonly Airplane[] {
    return [...this._airplanes];
  }

  public addCar(car: Car): void {
    if (car === null || car === undefined) {
      throw new Error('Car cannot be null or undefined!');
    }
    this._cars.push(car);
  }

  public addAirplane(airplane: Airplane): void {
    if (airplane === null || airplane === undefined) {
      throw new Error('Airplane cannot be null or undefined!');
    }
    this._airplanes.push(airplane);
  }
}