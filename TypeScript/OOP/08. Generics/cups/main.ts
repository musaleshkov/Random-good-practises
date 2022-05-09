import { ILiquid } from './contracts/liquid.contract';

import { Cup } from './models/cup.model';
import { Tea } from './models/tea.model';

const cup = new Cup<ILiquid<number>>();

cup.add(new Tea(20));
cup.add(new Tea(20));
cup.add(new Tea(20));
cup.add(new Tea(20));

console.log(cup.quantity);
