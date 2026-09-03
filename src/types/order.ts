export interface CartItem {
  title: string;
  price: number;
  img: string;
  qty: number;
}

export interface OrderTracking {
  id: string;
  customer: string;
  item: string;
  statusStep: number;
  eta: string;
  printer: string;
  trackingNo: string;
}
