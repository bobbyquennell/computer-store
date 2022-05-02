import { PricingRule, Product } from './types';

export class Checkout {
  #rules: PricingRule[] = [];
  #catalog: Product[] = [
    { sku: 'ipd', name: 'Super iPad', price: 549.99 },
    { sku: 'mpb', name: 'MacBook Pro', price: 1399.99 },
    { sku: 'atv', name: 'Apple TV', price: 109.5 },
    { sku: 'vga', name: 'VGA adapter', price: 30.0 },
  ];
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

  scan = (sku: string) => {
    const product = this.#catalog.find((p) => p.sku === sku);
    if (!product) {
      console.log('cannot find product with sku:', sku);
      return;
    }
    this.#cart.push({ ...product });
  };
}
