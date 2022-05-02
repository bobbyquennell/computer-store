import { catalog } from '../helper';
import { PricingRule, Product } from './types';

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

  scan = (sku: string) => {
    const product = this.#catalog.find((p) => p.sku === sku);
    if (!product) {
      console.log('cannot find product with sku:', sku);
      return;
    }
    this.#cart.push({ ...product });
  };

  total = () =>
    this.#cart
      .reduce((total, product) => (total += product.price), 0)
      .toFixed(2);
}
