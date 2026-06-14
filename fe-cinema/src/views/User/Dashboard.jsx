import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    // Simulasi data user (Nantinya data ini diambil dari API atau Context/Redux setelah login)
    const [user] = useState({ name: 'Pengguna' }); 

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
        /* Pembungkus layar penuh pengganti AuthenticatedLayout */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Nantinya Komponen Navbar bisa letakkan di sini */}

            <div className="max-w-6xl mx-auto px-6 py-8">

                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-white">
                        Halo, <span className="text-[#a855f7] font-medium">{user.name}</span>! 👋
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Berikut ringkasan aktivitas kamu di CineMatch</p>
                </div>

                {/* Grid Tiga Kolom untuk Statistik Utama */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 text-center transition hover:border-zinc-700">
                            <div className="text-2xl font-bold text-white mb-0.5">{s.value}</div>
                            <div className="text-[11px] text-zinc-500 uppercase font-medium tracking-wide">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Pembagian Layout Utama */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Kolom Kiri dan Tengah (Lebar 2 Kolom) */}
                    <div className="md:col-span-2 flex flex-col gap-6">

                        {/* Blok Top Rekomendasi Hari Ini */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-sm text-white">Top rekomendasi hari ini</h2>
                                <Link to="/jelajahi" className="text-xs text-purple-400 hover:underline transition">Lihat semua →</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {rekomendasi.map((film) => (
                                    <div key={film.id} className="flex items-center gap-3 p-3 bg-[#222222] border border-zinc-800/50 rounded-xl group transition hover:border-zinc-700">
                                        <div className="w-10 h-14 bg-[#262626] rounded-lg border border-zinc-800 flex items-center justify-center shrink-0 select-none">
                                            <span className="text-zinc-600 text-[10px] font-medium">Poster</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-white transition group-hover:text-purple-400">{film.judul}</div>
                                            <div className="text-xs text-zinc-500 mt-0.5">{film.genre}</div>
                                        </div>
                                        <span className="text-[11px] font-medium bg-purple-950/40 text-white border border-purple-900/40 px-2.5 py-1 rounded-full tracking-wide">
                                            {film.match}% cocok
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Blok Riwayat Tontonan Terakhir */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-sm text-white">Riwayat terakhir</h2>
                                <Link to="/riwayat" className="text-xs text-purple-400 hover:underline transition">Lihat semua →</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {riwayatTerakhir.map((film) => (
                                    <div key={film.id} className="flex items-center gap-3 p-3 bg-[#222222] border border-zinc-800/50 rounded-xl group transition hover:border-zinc-700">
                                        <div className="w-10 h-14 bg-[#262626] rounded-lg border border-zinc-800 flex items-center justify-center shrink-0 select-none">
                                            <span className="text-zinc-600 text-[10px] font-medium">Poster</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-white transition group-hover:text-purple-400">{film.judul}</div>
                                            <div className="text-xs text-zinc-500 mt-0.5">{film.genre} · {film.tanggal}</div>
                                        </div>
                                        {film.rating > 0 ? (
                                            <div className="flex text-[10px] text-amber-500 tracking-tighter">
                                                {Array.from({ length: 5 }).map((_, idx) => (
                                                    <span key={idx} className={idx < film.rating ? 'text-amber-500' : 'text-zinc-700'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <button className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1 rounded-lg transition active:scale-95 shadow-sm shadow-purple-600/10">
                                                Beri rating
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Kolom Kanan (Lebar 1 Kolom) */}
                    <div className="flex flex-col gap-6">

                        {/* Panel Statistik Distribusi Genre */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            <h2 className="font-semibold text-sm text-white mb-4">Genre favoritmu</h2>
                            <div className="flex flex-col gap-3.5">
                                {genreStats.map((g) => (
                                    <div key={g.genre}>
                                        <div className="flex justify-between text-xs mb-1.5 font-medium">
                                            <span className="text-zinc-400">{g.genre}</span>
                                            <span className="text-purple-400">{g.pct}%</span>
                                        </div>
                                        <div className="w-full bg-[#262626] rounded-full h-1.5 border border-zinc-800/40 overflow-hidden">
                                            <div
                                                className="bg-purple-500 h-1.5 rounded-full shadow-sm shadow-purple-500/20"
                                                style={{ width: `${g.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Panel Menu Tautan Cepat */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            <h2 className="font-semibold text-sm text-white mb-4">Menu cepat</h2>
                            <div className="flex flex-col gap-1">
                                <Link to="/jelajahi" className="flex items-center gap-2.5 text-xs text-zinc-400 hover:bg-[#222222] hover:text-white px-3 py-2 rounded-lg transition">
                                    <span className="text-sm">🎬</span> Jelajahi film
                                </Link>
                                <Link to="/riwayat" className="flex items-center gap-2.5 text-xs text-zinc-400 hover:bg-[#222222] hover:text-white px-3 py-2 rounded-lg transition">
                                    <span className="text-sm">📋</span> Riwayat tontonan
                                </Link>
                                <Link to="/profil" className="flex items-center gap-2.5 text-xs text-zinc-400 hover:bg-[#222222] hover:text-white px-3 py-2 rounded-lg transition">
                                    <span className="text-sm">👤</span> Edit profil
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}