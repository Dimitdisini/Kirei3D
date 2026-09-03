import { Review } from '@/types/review';

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch('/api/reviews');
  const json = await res.json();
  return json.success ? json.data : [];
}

export async function submitReview(payload: {
  name: string;
  product: string;
  comment: string;
  photo: string;
}): Promise<Review | null> {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  return json.success ? json.data : null;
}
