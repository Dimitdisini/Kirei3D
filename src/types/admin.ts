export interface AdminOrder {
  id: string;
  customer: string;
  item: string;
  qty: number;
  total: number;
  status: string;
  printer: string;
}

export interface PrinterFleet {
  name: string;
  status: string;
  temp: string;
  job: string;
}

export interface FounderInfo {
  name: string;
  role: string;
  desc: string;
  badgeColor: string;
}
