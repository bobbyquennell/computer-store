import fs from 'fs';
import path from 'path';
import { Checkout } from './Checkout';
import { executeCmds, rules } from './helper';

const data = fs.readFileSync(path.resolve(__dirname, 'commands.txt'));

const cmds: string[] = data.toString().trim().split('\n');
const checkout = new Checkout([
  rules['3for2AppleTV'],
  rules['bulkDiscountIpad'],
]);

executeCmds(cmds, checkout);
