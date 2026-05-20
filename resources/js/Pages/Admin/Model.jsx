import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function AdminModel() {
    return (
        <AdminLayout>
            <Head title="Model ML — CineMatch" />

            <div className="mb-6">
                <h1 className="text-xl font-medium">Model ML</h1>
                <p className="text-sm text-gray-500 mt-1">Kelola dan pantau performa model rekomendasi</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="font-medium text-sm mb-4">Model aktif</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div>
                                <div className="text-sm font-medium text-purple-800">Collaborative Filtering v2</div>
                                <div className="text-xs text-purple-600 mt-0.5">Terakhir dilatih: 3 hari lalu</div>
                            </div>
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">Aktif</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <div>
                                <div className="text-sm font-medium text-gray-600">Content-Based Filtering v1</div>
                                <div className="text-xs text-gray-400 mt-0.5">Terakhir dilatih: 2 minggu lalu</div>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-medium">Nonaktif</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="font-medium text-sm mb-4">Performa model</h2>
                    <div className="flex flex-col gap-3">
                        {[
                            { label: 'Akurasi', value: '87.3%', pct: 87 },
                            { label: 'Precision', value: '84.1%', pct: 84 },
                            { label: 'Recall', value: '82.7%', pct: 83 },
                            { label: 'F1 Score', value: '83.4%', pct: 83 },
                        ].map((m) => (
                            <div key={m.label}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">{m.label}</span>
                                    <span className="font-medium">{m.value}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${m.pct}%` }}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="font-medium text-sm mb-4">Retrain model</h2>
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium mb-1">4.891</div>
                        <div className="text-xs text-gray-500">Total rating tersedia</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium mb-1">328</div>
                        <div className="text-xs text-gray-500">Total user aktif</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="text-lg font-medium mb-1">1.240</div>
                        <div className="text-xs text-gray-500">Total film</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                        🔄 Mulai retrain
                    </button>
                    <span className="text-xs text-gray-400">Estimasi waktu: 5-10 menit</span>
                </div>
            </div>
        </AdminLayout>
    );
}
