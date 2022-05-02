import { catalog } from '../helper';
import {
  Discount,
  DiscountThreshold,
  DiscountType,
  PricingRule,
  Product,
} from './types';

export class Checkout {
  #rules: PricingRule[] = [];
  #catalog: Product[] = catalog;
  #cart: Product[] = [];
  constructor(rules?: PricingRule[]) {
    if (rules) this.#rules = rules;
  }

  get rules(): string {
    return this.#rules.map((r) => r.name).join(',');
  }
  get cart(): string {
    return this.#cart.map((r) => r.name).join(',');
  }

  #isQualifiedForDiscount = (threshold: DiscountThreshold, cart: Product[]) => {
    const qty = cart.filter((item) => item.sku === threshold.sku).length;
    if (threshold.exactCount) {
      return qty === threshold.exactCount;
    }
    if (threshold.minCount) {
      return qty >= threshold.minCount;
    }
    return false;
  };

  #applyDiscount3for2 = (discount: Discount, cart: Product[]): Product[] => {
    if (!discount.qtyOfFreeItems) return [...cart];
    const unDiscountedItems = cart.filter((item) => item.sku !== discount.sku);
    const targetItems = cart.filter((item) => item.sku === discount.sku);
    // make the first item free
    targetItems[0].price = 0;

    return [...unDiscountedItems, ...targetItems];
  };

  #applyBulkDiscount = (discount: Discount, cart: Product[]) => {
    const unDiscountedItems = cart.filter((item) => item.sku !== discount.sku);
    const targetItems = cart.filter((item) => item.sku === discount.sku);
    const discountedItems = targetItems.map(
      (item) =>
        ({
          ...item,
          price: discount.discountPrice ?? item.price,
        } as Product),
    );
    return [...unDiscountedItems, ...discountedItems];
  };

  #applyDiscount: Record<
    DiscountType,
    (discount: Discount, cart: Product[]) => Product[]
  > = {
    bulkDiscount: (discount: Discount, cart: Product[]) =>
      this.#applyBulkDiscount(discount, cart),
    '3for2': (discount: Discount, cart: Product[]) =>
      this.#applyDiscount3for2(discount, cart),
  };
  scan = (sku: string) => {
    console.log('SCAN ', sku);
    const product = this.#catalog.find((p) => p.sku === sku);
    if (!product) {
      console.warn('cannot find product with sku:', sku);
      return;
    }
    this.#cart.push({ ...product });
    console.log('Cart:', this.cart);
  };

  total = () => {
    console.log('TOTAL');
    for (const rule of this.#rules) {
      if (this.#isQualifiedForDiscount(rule.threshold, this.#cart)) {
        console.log('\x1b[32m%s\x1b[0m', 'WOW, you found a deal !', rule.name);
        this.#cart = this.#applyDiscount[rule.discount.type](
          rule.discount,
          this.#cart,
        );
      }
    }

    const total = this.#cart
      .reduce((total, product) => (total += product.price), 0)
      .toFixed(2);

    console.log('total price: $', total);
    return total;
  };
}
