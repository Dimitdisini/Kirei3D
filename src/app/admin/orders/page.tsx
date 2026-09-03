'use client';

import { useState, useEffect } from 'react';
import OrderTable from '@/components/admin/OrderTable';
import { AdminOrder } from '@/types/admin';
import { fetchAdminOrders, updateAdminOrderStatus } from '@/services/adminService';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = async () => {
    setIsLoading(true);
    const data = await fetchAdminOrders();
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const updated = await updateAdminOrderStatus(id, newStatus);
    setOrders(updated);
  };

  return <OrderTable orders={orders} isLoading={isLoading} onUpdateStatus={handleUpdateStatus} />;
}
