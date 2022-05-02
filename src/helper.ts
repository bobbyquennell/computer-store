import { Checkout, PricingRule, Product, RuleName } from './Checkout';
import { Command, CmdFunctionType, ScanFunctionType } from './types';

export const catalogSkus = {
  Ipad: 'ipd',
  MacbookPro: 'mbp',
  AppleTV: 'atv',
  VgaAdapter: 'vga',
} as const;

export const catalog: Product[] = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mpb', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.5 },
  { sku: 'vga', name: 'VGA adapter', price: 30.0 },
];
export const rules: Record<RuleName, PricingRule> = {
  '3for2AppleTV': {
    name: '3for2AppleTV',
    threshold: { sku: catalogSkus.AppleTV, exactCount: 3 },
    discount: { type: '3for2', sku: catalogSkus.AppleTV, qtyOfFreeItems: 1 },
  },
  bulkDiscountIpad: {
    name: 'bulkDiscountIpad',
    threshold: { sku: catalogSkus.Ipad, minCount: 4 },
    discount: {
      type: 'bulkDiscount',
      sku: catalogSkus.Ipad,
      discountPrice: 499.99,
    },
  },
};

const execCmd: Record<Command, CmdFunctionType> = {
  TOTAL: (checkout: Checkout) => checkout.total(),

  SCAN: (checkout: Checkout) => (sku: string) => checkout.scan(sku),
};

export const isCommandType = (input: string): input is Command => {
  return ['SCAN', 'TOTAL'].includes(input);
};
export const executeCmds = (cmds: string[], checkout: Checkout) => {
  for (const cmd of cmds) {
    const cmdTypeAndArgs = cmd.split(',');
    const cmdType = cmdTypeAndArgs[0] as Command;
    if (!isCommandType(cmdType)) {
      console.log('invalid cmd:', cmdType);
      break;
    }
    if (cmdType !== 'TOTAL') {
      const sku = cmdTypeAndArgs[1]?.trim();
      (execCmd[cmdType](checkout) as ScanFunctionType)(sku);
    } else {
      execCmd[cmdType](checkout);
    }
  }
};
