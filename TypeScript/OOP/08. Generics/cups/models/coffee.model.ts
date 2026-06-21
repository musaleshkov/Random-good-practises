import { ILiquid } from '../contracts/liquid.contract';

// Coffee with numeric quantity (milliliters)
export class Coffee implements ILiquid<number> {
  public constructor(public readonly quantity: number) {}

  public label(): string {
    return `Coffee (${this.quantity}ml)`;
  }
}