import { ILiquid } from '../contracts/liquid.contract';

export class Coffee implements ILiquid<number> {
  public constructor(public readonly quantity: number) {
  }
}
