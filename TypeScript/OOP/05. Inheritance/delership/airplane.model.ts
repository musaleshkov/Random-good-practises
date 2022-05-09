import { Color } from './color.enum';
import { Vehicle } from './vehicle.model';

export class Airplane extends Vehicle {
  private _enginesCount: number;

  constructor(manufacturer: string, color: Color, enginesCount: number) {
    super(manufacturer, color);

    this.enginesCount = enginesCount;
  }

  public get enginesCount(): number {
    return this._enginesCount;
  }

  public set enginesCount(value: number) {
    if (value < 1 || value > 4) {
      throw new Error('An airplane cannot have less than 1 engine or more than 4 engines!');
    }

    this._enginesCount = value;
  }

  public fly() {
    console.log('The airplane flies!!');
  }
}
