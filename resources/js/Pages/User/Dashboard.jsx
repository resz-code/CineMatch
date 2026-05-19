import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const stats = [
        { label: 'Film ditonton', value: 47 },
        { label: 'Rating diberikan', value: 32 },
        { label: 'Di watchlist', value: 15 },
    ];

    const genreStats = [
        { genre: 'Sci-Fi', pct: 82 },
        { genre: 'Drama', pct: 65 },
        { genre: 'Thriller', pct: 48 },
        { genre: 'Komedi', pct: 30 },
    ];

    const rekomendasi = [
        { id: 1, judul: 'Arrival', genre: 'Sci-Fi', match: 96 },
        { id: 2, judul: 'Ex Machina', genre: 'Sci-Fi', match: 91 },
        { id: 3, judul: 'Gone Girl', genre: 'Thriller', match: 87 },
    ];

    const riwayatTerakhir = [
        { id: 1, judul: 'Interstellar', genre: 'Sci-Fi', tanggal: '28 Mar 2025', rating: 5 },
        { id: 2, judul: 'Parasite', genre: 'Drama', tanggal: '8 Apr 2025', rating: 4 },
        { id: 3, judul: 'Poor Things', genre: 'Komedi', tanggal: '3 Apr 2025', rating: 0 },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard — CineMatch" />

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Sambutan */}
                <div className="mb-6">
                    <h1 className="text-xl font-medium">Halo, {auth.user.name}! 👋</h1>
                    <p className="text-sm text-gray-500 mt-1">Berikut ringkasan aktivitas kamu di CineMatch</p>
                </div>

                {/* Statistik */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="text-2xl font-medium mb-1">{s.value}</div>
                            <div className="text-xs text-gray-500">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-6">

                    {/* Kolom kiri */}
                    <div className="col-span-2 flex flex-col gap-6">

                        {/* Top rekomendasi */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-medium text-sm">Top rekomendasi hari ini</h2>
                                <Link href="/jelajahi" className="text-xs text-purple-600 hover:underline">Lihat semua →</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {rekomendasi.map((film) => (
                                    <div key={film.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-400 text-xs">🎬</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{film.judul}</div>
                                            <div className="text-xs text-gray-500">{film.genre}</div>
                                        </div>
                                        <span className="text-xs font-medium text-teal-600">{film.match}% cocok</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Riwayat terakhir */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-medium text-sm">Riwayat terakhir</h2>
                                <Link href="/riwayat" className="text-xs text-purple-600 hover:underline">Lihat semua →</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {riwayatTerakhir.map((film) => (
                                    <div key={film.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-400 text-xs">🎬</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{film.judul}</div>
                                            <div className="text-xs text-gray-500">{film.genre} · {film.tanggal}</div>
                                        </div>
                                        {film.rating > 0 ? (
                                            <div className="flex gap-0.5">
                                                {[1,2,3,4,5].map((s) => (
                                                    <span key={s} className={s <= film.rating ? 'text-yellow-500 text-sm' : 'text-gray-200 text-sm'}>★</span>
                                                ))}
                                            </div>
                                        ) : (
                                            <button className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-lg">
                                                Beri rating
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Kolom kanan */}
                    <div className="flex flex-col gap-6">

                        {/* Genre favorit */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h2 className="font-medium text-sm mb-4">Genre favoritmu</h2>
                            <div className="flex flex-col gap-3">
                                {genreStats.map((g) => (
                                    <div key={g.genre}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-600">{g.genre}</span>
                                            <span className="text-gray-500">{g.pct}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                            <div
                                                className="bg-purple-500 h-1.5 rounded-full"
                                                style={{ width: `${g.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick links */}
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                            <h2 className="font-medium text-sm mb-4">Menu cepat</h2>
                            <div className="flex flex-col gap-2">
                                <Link href="/jelajahi" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition">
                                    <span>🎬</span> Jelajahi film
                                </Link>
                                <Link href="/riwayat" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition">
                                    <span>📋</span> Riwayat tontonan
                                </Link>
                                <Link href="/profil" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition">
                                    <span>👤</span> Edit profil
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
