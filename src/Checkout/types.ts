export const RuleNames = {
  BulkDiscountIpad: 'bulkDiscountIpad',
  '3for2AppleTV': '3for2AppleTV',
} as const;

export type RuleName = typeof RuleNames[keyof typeof RuleNames];
export interface PricingRule {
  name: RuleName;
}
export interface Product {
  sku: string;
  name: string;
  price: number;
}
