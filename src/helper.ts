import { Product } from './Checkout/types';

export const CatalogSkus = {
  Ipad: 'ipd',
  MacbookPro: 'mbp',
  AppleTV: 'atv',
  VgaAdapter: 'vga',
} as const;

export const Catalog: Product[] = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mpb', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.5 },
  { sku: 'vga', name: 'VGA adapter', price: 30.0 },
];
