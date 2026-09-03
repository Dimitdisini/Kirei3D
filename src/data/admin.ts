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

export const initialAdminOrders: AdminOrder[] = [
  {
    id: 'K3D-9842',
    customer: 'Aurel A.',
    item: 'Miniatur Chibi Custom (Sakura Pink) + Paint Kit',
    qty: 1,
    total: 110000,
    status: 'Printing in Progress',
    printer: 'Prusa MK4 #03',
  },
  {
    id: 'K3D-8821',
    customer: 'Rian Pratama',
    item: 'Plakat Strava Topo 3D Relief Marathon',
    qty: 2,
    total: 300000,
    status: 'Post-Processing & QC',
    printer: 'Bambu Lab X1C #01',
  },
  {
    id: 'K3D-7712',
    customer: 'Nadia S.',
    item: 'Artisanal Keycap Anime Pop',
    qty: 4,
    total: 140000,
    status: 'Pesanan Diterima',
    printer: 'Elegoo Mars 4 8K #02',
  },
];

export const initialFleetStatus: PrinterFleet[] = [
  {
    name: 'Bambu Lab X1-Carbon #01',
    status: 'Active (82%)',
    temp: 'Nozzle: 220°C | Bed: 65°C',
    job: 'Topo Relief Strava',
  },
  {
    name: 'Elegoo Mars 4 8K Resin #02',
    status: 'Active (45%)',
    temp: 'UV Light Exposure: 2.5s',
    job: 'Anime Artisanal Keycaps',
  },
  {
    name: 'Prusa MK4 #03',
    status: 'Standby / Idle',
    temp: 'Nozzle: 25°C | Bed: 25°C',
    job: 'Siap untuk antrean baru',
  },
];

export const initialFounders: FounderInfo[] = [
  {
    name: 'Dimitri',
    role: 'Chief Executive Officer (CEO)',
    desc: 'Lead 3D Designer & Product Visionary',
    badgeColor: 'pink',
  },
  {
    name: 'Bayu',
    role: 'Chief Operating Officer (COO)',
    desc: 'Head of 3D Printing Fleet & Logistics',
    badgeColor: 'sky',
  },
  {
    name: 'Puja',
    role: 'Chief Creative Officer (CCO)',
    desc: 'Creative Art Director & Finishing Specialist',
    badgeColor: 'purple',
  },
];
