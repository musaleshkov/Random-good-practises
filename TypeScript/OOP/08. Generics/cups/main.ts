import { ILiquid } from './contracts/liquid.contract';

import { Coffee } from './models/coffee.model';
import { Cup } from './models/cup.model';
import { Tea } from './models/tea.model';

// Generic Cup — works with Coffee and Tea (both ILiquid<number>)
const coffeeCup = new Cup<Coffee>();
coffeeCup.add(new Coffee(200));
coffeeCup.add(new Coffee(150));
console.log(`Coffee cup: ${coffeeCup.totalQuantity}ml`);
console.log('Contents:', coffeeCup.listContents());

coffeeCup.drink(100);
console.log(`After drinking: ${coffeeCup.totalQuantity}ml`);

const teaCup = new Cup<Tea>();
teaCup.add(new Tea(250));
teaCup.add(new Tea(100));
console.log(`\nTea cup: ${teaCup.totalQuantity}ml`);
console.log('Contents:', teaCup.listContents());

// Polymorphic: pass any ILiquid<number> to a function
function fillCup<T extends ILiquid<number>>(cup: Cup<T>, liquid: T, times: number): void {
  for (let i = 0; i < times; i++) {
    cup.add(liquid);
  }
}

const mixedCup = new Cup<Coffee>();
fillCup(mixedCup, new Coffee(50), 3);
console.log(`\nMixed cup: ${mixedCup.totalQuantity}ml`);
console.log('Contents:', mixedCup.listContents());

export {};