export const RuleNames = {
  BulkDiscountIpad: 'bulkDiscountIpad',
  '3for2AppleTV': '3for2AppleTV',
} as const;

export type RuleName = typeof RuleNames[keyof typeof RuleNames];

export interface DiscountThreshold {
  sku: string;
  count: number;
}

export const DiscountTypes = {
  BulkDiscount: 'bulkDiscount',
  '3for2': '3for2',
} as const;

export type DiscountType = typeof DiscountTypes[keyof typeof DiscountTypes];
export interface Discount {
  type: DiscountType;
  sku: string;
  qtyOfFreeItems: number;
}
export interface PricingRule {
  name: RuleName;
  threshold: DiscountThreshold;
  discount: Discount;
}
export interface Product {
  sku: string;
  name: string;
  price: number;
}
