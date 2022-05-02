import { PricingRule, Product, RuleName } from './Checkout/types';

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
  },
  bulkDiscountIpad: {
    name: 'bulkDiscountIpad',
  },
};
