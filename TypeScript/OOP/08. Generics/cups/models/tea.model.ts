import { ILiquid } from '../contracts/liquid.contract';

// Tea with numeric quantity (milliliters)
export class Tea implements ILiquid<number> {
  public constructor(public readonly quantity: number) {}

  public label(): string {
    return `Tea (${this.quantity}ml)`;
  }
}