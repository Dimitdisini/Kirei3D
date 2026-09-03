import { NextResponse } from 'next/server';
import { initialProducts } from '@/data/products';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialProducts,
  });
}
