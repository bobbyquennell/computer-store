import { catalogSkus, rules } from '../helper';
import { Checkout } from './Checkout';

describe('Checkout', () => {
  describe('Initialize', () => {
    it('should create checkout with pricing rules', () => {
      const sut = new Checkout([rules.bulkDiscountIpad]);
      expect(sut.rules).toEqual(rules.bulkDiscountIpad.name);
    });
  });
  describe('Scan', () => {
    it('given valid item from product catalog, should add item to cart', () => {
      const sut = new Checkout();
      sut.scan(catalogSkus.AppleTV);
      expect(sut.cart).toEqual('Apple TV');
    });
    it('given invalid item, should not add item to cart', () => {
      const sut = new Checkout();
      sut.scan(catalogSkus.AppleTV);
      sut.scan('apple');
      expect(sut.cart).toEqual('Apple TV');
    });
  });

  describe('Total', () => {
    it('should return original total, if no active deals', () => {
      const sut = new Checkout();
      sut.scan(catalogSkus.AppleTV);
      expect(sut.total()).toEqual((109.5).toFixed(2));
    });
  });

  describe('buy 3 for 2 Apple TV', () => {
    it('Given scanned items: atv, atv, atv, vga, should return total price: $249.00', () => {
      const skus = ['atv', 'atv', 'atv', 'vga'];
      const sut = new Checkout([rules['3for2AppleTV']]);
      skus.forEach((sku) => {
        sut.scan(sku);
      });
      expect(sut.total()).toEqual((249.0).toFixed(2));
    });
  });

  describe('Bulk discount iPad', () => {
    it('Given scanned items: atv, ipd, ipd, atv, ipd, ipd, ipd, should return total price: $2718.95', () => {
      const skus = ['atv', 'ipd', 'ipd', 'atv', 'ipd', 'ipd', 'ipd'];
      const sut = new Checkout([rules['bulkDiscountIpad']]);
      skus.forEach((sku) => {
        sut.scan(sku);
      });
      expect(sut.total()).toEqual((2718.95).toFixed(2));
    });
  });
});
