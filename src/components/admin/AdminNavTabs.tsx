'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Printer, TrendingUp } from 'lucide-react';

export default function AdminNavTabs() {
  const pathname = usePathname();

  const tabs = [
    {
      href: '/admin/orders',
      label: '1. Antrean Order & Live Fleet',
      icon: ClipboardList,
      isActive: pathname === '/admin/orders' || pathname === '/admin',
    },
    {
      href: '/admin/fleet',
      label: '2. Status Mesin 3D Printer',
      icon: Printer,
      isActive: pathname === '/admin/fleet',
    },
    {
      href: '/admin/metrics',
      label: '3. Performa & Founders Dashboard',
      icon: TrendingUp,
      isActive: pathname === '/admin/metrics',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 mb-8 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-xs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2.5 rounded-xl text-xs font-cute font-bold transition-all flex items-center gap-2 ${
              tab.isActive
                ? 'nav-tab-active'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
