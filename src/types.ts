import { Checkout } from './Checkout';

export const Commands = {
  Scan: 'SCAN',
  Total: 'TOTAL',
} as const;
export type Command = typeof Commands[keyof typeof Commands];

export type CmdFunctionType = (checkout: Checkout) => unknown;
export type ScanFunctionType = (sku: string) => void;
