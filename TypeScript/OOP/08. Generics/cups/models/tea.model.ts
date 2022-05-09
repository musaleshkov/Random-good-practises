import { ILiquid } from '../contracts/liquid.contract';

export class Tea implements ILiquid<number> {
  public constructor(public readonly quantity: number) {
  }
}
