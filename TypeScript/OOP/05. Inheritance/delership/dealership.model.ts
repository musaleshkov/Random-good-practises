import _ from 'lodash';

import { Airplane } from './airplane.model';
import { Car } from './car.model';

export class Dealership {
  private _name: string;

  private readonly _cars: Car[] = [];
  private readonly _airplanes: Airplane[] = [];

  public get name(): string {
    return this._name;
  }

  public set name(v: string) {
    this._name = v;
  }

  public get Cars(): Car[] {
    return _.cloneDeep(this._cars);
  }

  public get Airplanes(): Airplane[] {
    return _.cloneDeep(this._airplanes);
  }

  public addCar(car: Car) {
    if (car === null || car === undefined) {
      throw new Error('Car cannot be null or undefined!');
    }

    this._cars.push(car);
  }

  public addAirplane(airplane: Airplane) {
    if (airplane === null || airplane === undefined) {
      throw new Error('Airplane cannot be null or undefined!');
    }

    this._airplanes.push(airplane);
  }
}
