import { Checkout } from './Checkout';
import { PricingRule } from './types';

describe('Checkout', () => {
  describe('Initialize', () => {
    it('should create checkout with pricing rules', () => {
      const rules: PricingRule[] = [
        { name: '3for2AppleTV' },
        { name: 'bulkDiscountIpad' },
      ];
      const sut = new Checkout(rules);
      expect(sut.rules).toEqual(rules.map((r) => r.name).join(','));
    });
  });
  describe('Scan', () => {
    it('given valid item from product catalog, should add item to cart', () => {
      const sut = new Checkout();
      sut.scan('atv');
      expect(sut.cart).toEqual('Apple TV');
    });
    it('given invalid item, should not add item to cart', () => {
      const sut = new Checkout();
      sut.scan('atv');
      sut.scan('apple');
      expect(sut.cart).toEqual('Apple TV');
    });
  });
});
