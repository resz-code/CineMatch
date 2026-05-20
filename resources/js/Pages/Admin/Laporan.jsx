import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function AdminLaporan() {
    const aktivitasHarian = [
        { hari: 'Senin', user: 42, rating: 128 },
        { hari: 'Selasa', user: 38, rating: 95 },
        { hari: 'Rabu', user: 55, rating: 167 },
        { hari: 'Kamis', user: 47, rating: 143 },
        { hari: 'Jumat', user: 61, rating: 189 },
        { hari: 'Sabtu', user: 73, rating: 210 },
        { hari: 'Minggu', user: 68, rating: 198 },
    ];

    const topFilm = [
        { judul: 'Interstellar', ditonton: 284, rating: 4.8 },
        { judul: 'The Dark Knight', ditonton: 261, rating: 4.9 },
        { judul: 'Inception', ditonton: 247, rating: 4.8 },
        { judul: 'Parasite', ditonton: 198, rating: 4.6 },
        { judul: 'Spirited Away', ditonton: 187, rating: 4.7 },
    ];

    const maxUser = Math.max(...aktivitasHarian.map(a => a.user));

    return (
        <AdminLayout>
            <Head title="Laporan — CineMatch" />

            <div className="mb-6">
                <h1 className="text-xl font-medium">Laporan & Analitik</h1>
                <p className="text-sm text-gray-500 mt-1">Ringkasan aktivitas sistem minggu ini</p>
            </div>

            {/* Ringkasan minggu ini */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'User aktif minggu ini', value: '384', change: '+12%' },
                    { label: 'Rating baru', value: '1.130', change: '+8%' },
                    { label: 'Film baru ditambah', value: '24', change: '+5%' },
                    { label: 'Rekomendasi diberikan', value: '9.847', change: '+15%' },
                ].map((s) => (
                    <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="text-2xl font-medium mb-1">{s.value}</div>
                        <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                        <div className="text-xs text-teal-600 font-medium">{s.change} dari minggu lalu</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">

                {/* Grafik aktivitas harian */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="font-medium text-sm mb-4">Aktivitas harian (user aktif)</h2>
                    <div className="flex items-end gap-2 h-32">
                        {aktivitasHarian.map((a) => (
                            <div key={a.hari} className="flex-1 flex flex-col items-center gap-1">
                                <div className="text-xs text-gray-500">{a.user}</div>
                                <div
                                    className="w-full bg-purple-500 rounded-t-md"
                                    style={{ height: `${(a.user / maxUser) * 100}px` }}
                                />
                                <div className="text-xs text-gray-400">{a.hari.slice(0,3)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top film */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <h2 className="font-medium text-sm mb-4">Film paling banyak ditonton</h2>
                    <div className="flex flex-col gap-3">
                        {topFilm.map((film, index) => (
                            <div key={film.judul} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-medium flex-shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{film.judul}</div>
                                    <div className="w-full bg-gray-100 rounded-full h-1 mt-1">
                                        <div
                                            className="bg-purple-400 h-1 rounded-full"
                                            style={{ width: `${(film.ditonton / topFilm[0].ditonton) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">{film.ditonton}x</div>
                                <div className="text-xs text-yellow-500">★{film.rating}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabel aktivitas harian lengkap */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="font-medium text-sm mb-4">Detail aktivitas harian</h2>
                <table className="w-full text-sm">
                    <thead className="border-b border-gray-100">
                        <tr>
                            <th className="text-left text-xs text-gray-400 font-medium pb-2">Hari</th>
                            <th className="text-left text-xs text-gray-400 font-medium pb-2">User aktif</th>
                            <th className="text-left text-xs text-gray-400 font-medium pb-2">Rating masuk</th>
                            <th className="text-left text-xs text-gray-400 font-medium pb-2">Rata-rata rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aktivitasHarian.map((a) => (
                            <tr key={a.hari} className="border-b border-gray-50">
                                <td className="py-2 font-medium">{a.hari}</td>
                                <td className="py-2">{a.user}</td>
                                <td className="py-2">{a.rating}</td>
                                <td className="py-2 text-yellow-500">★ {(a.rating / a.user).toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
