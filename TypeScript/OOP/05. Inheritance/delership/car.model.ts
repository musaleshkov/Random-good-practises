import { Color } from './color.enum';
import { Vehicle } from './vehicle.model';

export class Car extends Vehicle {
  private _doorsCount: number;

  constructor(manufacturer: string, color: Color, doorsCount: number) {
    super(manufacturer, color);

    this.doorsCount = doorsCount;
  }

  public get doorsCount(): number {
    return this._doorsCount;
  }

  public set doorsCount(value: number) {
    if (value < 2 || value > 8) {
      throw new Error('A car cannot have less than 2 doors or more than 8 doors!');
    }

    this._doorsCount = value;
  }

  public drive() {
    console.log('The car drives!!');
  }
}
