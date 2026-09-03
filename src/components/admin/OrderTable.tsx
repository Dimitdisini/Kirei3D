'use client';

import { AdminOrder } from '@/types/admin';

interface OrderTableProps {
  orders: AdminOrder[];
  isLoading?: boolean;
  onUpdateStatus: (id: string, newStatus: string) => void;
}

export default function OrderTable({ orders, isLoading, onUpdateStatus }: OrderTableProps) {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
      <h2 className="font-cute text-lg font-bold text-slate-900">
        Daftar Antrean Order Cetak 3D Real-Time
      </h2>

      {isLoading ? (
        <div className="text-center py-8 text-xs font-cute text-slate-400">
          Memuat data antrean dari API...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-cute">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400">
                <th className="py-3 px-4">ORDER ID</th>
                <th className="py-3 px-4">PEMESAN</th>
                <th className="py-3 px-4">PRODUK</th>
                <th className="py-3 px-4">TOTAL</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">ACTION STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-pink-600">{o.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{o.customer}</td>
                  <td className="py-3.5 px-4 text-slate-600">{o.item}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    Rp {o.total.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-pink-50 text-pink-700 font-bold border border-pink-200">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => onUpdateStatus(o.id, e.target.value)}
                      className="p-1.5 text-xs rounded-xl border border-slate-200 font-cute bg-white focus:border-pink-500"
                    >
                      <option value="Pesanan Diterima">Pesanan Diterima</option>
                      <option value="3D Slicing & File Prep">3D Slicing & File Prep</option>
                      <option value="Printing in Progress">Printing in Progress</option>
                      <option value="Post-Processing & QC">Post-Processing & QC</option>
                      <option value="Pengiriman Kurir">Pengiriman Kurir</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
