import { Product } from '@/types/product';
import { FaqItem } from '@/types/faq';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products');
  const json = await res.json();
  return json.success ? json.data : [];
}

export async function fetchFaqs(): Promise<FaqItem[]> {
  const res = await fetch('/api/faqs');
  const json = await res.json();
  return json.success ? json.data : [];
}
