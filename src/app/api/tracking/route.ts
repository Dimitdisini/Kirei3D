import { NextResponse } from 'next/server';
import { initialTrackingDatabase, OrderTracking } from '@/data/tracking';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = (searchParams.get('id') || 'K3D-9842').toUpperCase();

  if (initialTrackingDatabase[id]) {
    return NextResponse.json({
      success: true,
      data: initialTrackingDatabase[id],
    });
  }

  // Dynamic fallback for any unlisted ID
  const dynamicOrder: OrderTracking = {
    id: id,
    customer: 'Pelanggan Kirei3D',
    item: 'Custom 3D Print Order',
    statusStep: 2,
    eta: '1-2 Hari Kerja',
    printer: 'Bambu Lab P1S #04',
    trackingNo: 'Menunggu Kurir',
  };

  return NextResponse.json({
    success: true,
    data: dynamicOrder,
  });
}
