import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Riwayat({ auth }) {
    const [activeFilter, setActiveFilter] = useState('Semua');

    const riwayat = {
        'April 2025': [
            { id: 1, judul: 'Arrival', genre: 'Sci-Fi', tahun: 2016, tanggal: '12 Apr 2025', rating: 5, sudahRating: true },
            { id: 2, judul: 'Parasite', genre: 'Drama', tahun: 2019, tanggal: '8 Apr 2025', rating: 4, sudahRating: true },
            { id: 3, judul: 'Poor Things', genre: 'Komedi', tahun: 2023, tanggal: '3 Apr 2025', rating: 0, sudahRating: false },
        ],
        'Maret 2025': [
            { id: 4, judul: 'Interstellar', genre: 'Sci-Fi', tahun: 2014, tanggal: '28 Mar 2025', rating: 5, sudahRating: true },
            { id: 5, judul: 'Oppenheimer', genre: 'Drama', tahun: 2023, tanggal: '20 Mar 2025', rating: 0, sudahRating: false },
            { id: 6, judul: 'The Dark Knight', genre: 'Aksi', tahun: 2008, tanggal: '15 Mar 2025', rating: 5, sudahRating: true },
        ],
    };

    const filters = ['Semua', 'Sudah dirating', 'Belum dirating'];
    const stats = { total: 6, sudahRating: 4, rataRating: 4.2 };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Riwayat — CineMatch" />

            <div className="max-w-5xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-medium">Riwayat tontonan</h1>
                    <select className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                        <option>Semua waktu</option>
                        <option>Bulan ini</option>
                        <option>3 bulan terakhir</option>
                    </select>
                </div>

                {/* Statistik */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                        <div className="text-2xl font-medium mb-1">{stats.total}</div>
                        <div className="text-xs text-gray-500">Total ditonton</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                        <div className="text-2xl font-medium mb-1">{stats.sudahRating}</div>
                        <div className="text-xs text-gray-500">Sudah dirating</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                        <div className="text-2xl font-medium mb-1">{stats.rataRating}</div>
                        <div className="text-xs text-gray-500">Rata-rata rating</div>
                    </div>
                </div>

                {/* Filter */}
                <div className="flex gap-2 mb-6">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3 py-1 rounded-full border text-sm transition ${
                                activeFilter === f
                                    ? 'bg-purple-100 border-purple-300 text-purple-800'
                                    : 'bg-white border-gray-200 text-gray-500 hover:border-purple-300'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* List riwayat per bulan */}
                {Object.entries(riwayat).map(([bulan, films]) => {
                    const filtered = films.filter(f => {
                        if (activeFilter === 'Sudah dirating') return f.sudahRating;
                        if (activeFilter === 'Belum dirating') return !f.sudahRating;
                        return true;
                    });

                    if (filtered.length === 0) return null;

                    return (
                        <div key={bulan} className="mb-8">
                            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                                {bulan}
                            </div>
                            <div className="flex flex-col gap-3">
                                {filtered.map((film) => (
                                    <div key={film.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                                        <div className="w-10 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-400 text-sm">🎬</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm mb-1">{film.judul}</div>
                                            <div className="text-xs text-gray-500 mb-2">
                                                {film.genre} · {film.tahun} · {film.tanggal}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                                    film.genre === 'Sci-Fi' ? 'bg-purple-100 text-purple-800' :
                                                    film.genre === 'Drama' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-teal-100 text-teal-800'
                                                }`}>
                                                    {film.genre}
                                                </span>
                                                {film.sudahRating && (
                                                    <div className="flex gap-0.5">
                                                        {[1,2,3,4,5].map((s) => (
                                                            <span key={s} className={s <= film.rating ? 'text-yellow-500 text-sm' : 'text-gray-200 text-sm'}>★</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            {film.sudahRating ? (
                                                <span className="text-xs text-teal-600 font-medium">Sudah dirating</span>
                                            ) : (
                                                <button className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-lg hover:bg-purple-200 transition">
                                                    Beri rating
                                                </button>
                                            )}
                                            <button className="text-xs text-purple-600 hover:underline">
                                                Lihat detail →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
