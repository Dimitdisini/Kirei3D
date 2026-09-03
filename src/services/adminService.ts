import { AdminOrder } from '@/types/admin';

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const res = await fetch('/api/admin/orders');
  const json = await res.json();
  return json.success ? json.data : [];
}

export async function updateAdminOrderStatus(id: string, status: string): Promise<AdminOrder[]> {
  const res = await fetch('/api/admin/orders', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status }),
  });
  const json = await res.json();
  return json.success ? json.data : [];
}
