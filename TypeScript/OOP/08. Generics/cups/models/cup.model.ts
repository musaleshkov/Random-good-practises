import { ILiquid } from '../contracts/liquid.contract';

export class Cup<T extends ILiquid<number>> {
  public quantity: number;

  public constructor() {
    this.quantity = 0;
  }

  public add(liquid: T): void {
    this.quantity += liquid.quantity;
  }
}
