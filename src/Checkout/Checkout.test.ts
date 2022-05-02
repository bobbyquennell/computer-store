import { CatalogSkus } from '../helper';
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
      sut.scan(CatalogSkus.AppleTV);
      expect(sut.cart).toEqual('Apple TV');
    });
    it('given invalid item, should not add item to cart', () => {
      const sut = new Checkout();
      sut.scan(CatalogSkus.AppleTV);
      sut.scan('apple');
      expect(sut.cart).toEqual('Apple TV');
    });
  });

  describe('Total', () => {
    it('should return original total, if no active deals', () => {
      const sut = new Checkout();
      sut.scan(CatalogSkus.AppleTV);
      expect(sut.total()).toEqual((109.5).toFixed(2));
    });
  });
});
