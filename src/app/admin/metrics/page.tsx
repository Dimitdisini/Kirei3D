'use client';

import MetricsOverview from '@/components/admin/MetricsOverview';
import { initialFounders } from '@/data/admin';

export default function AdminMetricsPage() {
  return <MetricsOverview founders={initialFounders} />;
}
