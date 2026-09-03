import { OrderTracking } from '@/types/order';

export async function fetchTrackingOrder(orderId: string): Promise<OrderTracking | null> {
  const res = await fetch(`/api/tracking?id=${encodeURIComponent(orderId)}`);
  const json = await res.json();
  return json.success ? json.data : null;
}
