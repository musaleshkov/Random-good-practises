// Generic liquid interface — quantity can be any type (number, string, etc.)
export interface ILiquid<T> {
  quantity: T;
  label(): string;
}