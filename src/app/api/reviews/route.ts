import { NextResponse } from 'next/server';
import { initialReviews, Review } from '@/data/reviews';

let reviewsDatabase: Review[] = [...initialReviews];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: reviewsDatabase,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: body.name || 'Pelanggan Kirei3D',
      product: body.product || 'Custom 3D Print',
      comment: body.comment || '',
      photo: body.photo || '/assets/chibi.jpg',
      time: 'Baru saja',
      rating: 5,
    };
    reviewsDatabase = [newReview, ...reviewsDatabase];
    return NextResponse.json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}
