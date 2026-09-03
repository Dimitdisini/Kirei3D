'use client';

import FleetGrid from '@/components/admin/FleetGrid';
import { initialFleetStatus } from '@/data/admin';

export default function AdminFleetPage() {
  return <FleetGrid fleet={initialFleetStatus} />;
}
