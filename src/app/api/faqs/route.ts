import { NextResponse } from 'next/server';
import { initialFaqs } from '@/data/faqs';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: initialFaqs,
  });
}
