export interface OrderTracking {
  id: string;
  customer: string;
  item: string;
  statusStep: number; // 1 to 5
  eta: string;
  printer: string;
  trackingNo: string;
}

export const initialTrackingDatabase: Record<string, OrderTracking> = {
  'K3D-9842': {
    id: 'K3D-9842',
    customer: 'Aurel A.',
    item: 'Miniatur Chibi Custom (Sakura Pink) + Paint Kit',
    statusStep: 3,
    eta: 'Hari ini, 16:00 WIB',
    printer: 'Prusa MK4 #03 (Bed Temp: 60°C)',
    trackingNo: 'JP8291039421',
  },
  'K3D-8821': {
    id: 'K3D-8821',
    customer: 'Rian Pratama',
    item: 'Plakat Strava Topo 3D Relief Marathon',
    statusStep: 4,
    eta: 'Besok Pagi, 10:00 WIB',
    printer: 'Bambu Lab X1-Carbon #01',
    trackingNo: 'SPX902384729',
  },
  'K3D-7712': {
    id: 'K3D-7712',
    customer: 'Nadia S.',
    item: 'Artisanal Keycap Anime Pop',
    statusStep: 1,
    eta: 'Lusa, 14:00 WIB',
    printer: 'Elegoo Mars 4 8K #02',
    trackingNo: 'JP918237492',
  },
};
