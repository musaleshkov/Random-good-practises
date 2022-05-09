import { Color } from './color.enum';

export class Vehicle {
  private _manufacturer: string;
  private _color: Color;

  constructor(manufacturer: string, color: Color) {
    this.manufacturer = manufacturer;
    this.color = color;
  }

  public get manufacturer(): string {
    return this._manufacturer;
  }

  public set manufacturer(value: string) {
    if (!value) {
      throw new Error('Vehicle manufacturer cannot be empty!');
    }

    this._manufacturer = value;
  }

  public get color(): Color {
    return this._color;
  }

  public set color(value: Color) {
    if (value === null || value === undefined) {
      throw new Error('Vehicle color cannot be null or undefined!');
    }

    this._color = value;
  }
}
