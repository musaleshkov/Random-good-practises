import { ILiquid } from '../contracts/liquid.contract';

// Truly generic Cup — works with any ILiquid<T> where T is the quantity type
export class Cup<T extends ILiquid<number>> {
  public totalQuantity: number = 0;
  private contents: T[] = [];

  public add(liquid: T): void {
    this.totalQuantity += liquid.quantity;
    this.contents.push(liquid);
  }

  public listContents(): string[] {
    return this.contents.map((l) => l.label());
  }

  public drink(amount: number): void {
    this.totalQuantity = Math.max(0, this.totalQuantity - amount);
  }
}