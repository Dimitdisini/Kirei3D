import { NextResponse } from 'next/server';
import { initialAdminOrders, AdminOrder } from '@/data/admin';

let adminOrdersDatabase: AdminOrder[] = [...initialAdminOrders];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: adminOrdersDatabase,
  });
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    adminOrdersDatabase = adminOrdersDatabase.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    return NextResponse.json({
      success: true,
      data: adminOrdersDatabase,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update order status' },
      { status: 400 }
    );
  }
}
