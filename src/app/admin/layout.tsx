import AdminHeader from '@/components/admin/AdminHeader';
import AdminNavTabs from '@/components/admin/AdminNavTabs';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-6 lg:p-8 selection:bg-purple-200 selection:text-purple-900 pb-16">
      <AdminHeader />
      <AdminNavTabs />
      <main>{children}</main>
    </div>
  );
}
