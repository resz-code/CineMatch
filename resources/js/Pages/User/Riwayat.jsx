import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Riwayat() {
    const [activeFilter, setActiveFilter] = useState('Semua');

    // Data riwayat disesuaikan urutannya & strukturnya dengan gambar Figma
    const riwayat = {
        'April 2025': [
            { id: 1, judul: 'Arrival', genre: 'Sci-Fi', tahun: 2016, tanggal: '12 Apr 2025', rating: 5, sudahRating: true },
            { id: 2, judul: 'Parasite', genre: 'Drama', tahun: 2019, tanggal: '8 Apr 2025', rating: 4, sudahRating: true },
            { id: 3, judul: 'Poor Things', genre: 'Komedi', tahun: 2023, tanggal: '3 Apr 2025', rating: 0, sudahRating: false },
        ],
        'Maret 2025': [
            { id: 4, judul: 'Interstellar', genre: 'Sci-Fi', tahun: 2014, tanggal: '28 Mar 2025', rating: 5, sudahRating: true },
            { id: 5, judul: 'Oppenheimer', genre: 'Drama', tahun: 2023, tanggal: '20 Mar 2025', rating: 0, sudahRating: false },
        ],
    };

    const filters = ['Semua', 'Sudah dirating', 'Belum dirating', 'Di watchlist'];
    
    // Statistik disesuaikan persis dengan isi angka di mockup Figma
    const stats = { total: 47, sudahRating: 32, rataRating: 4.2 };

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat — CineMatch" />

            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold tracking-wide text-white">Riwayat tontonan</h1>
                    <select className="bg-[#1a1a1a] border border-zinc-800 text-xs text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer transition">
                        <option>Semua waktu</option>
                        <option>Bulan ini</option>
                        <option>3 bulan terakhir</option>
                    </select>
                </div>

                {/* Statistik dengan background gelap (#1a1a1a) */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{stats.total}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Total ditonton</div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{stats.sudahRating}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Sudah dirating</div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{stats.rataRating}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Rata-rata rating</div>
                    </div>
                </div>

                {/* Filter Kapsul */}
                <div className="flex gap-2 flex-wrap mb-6">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${
                                activeFilter === f
                                    ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                    : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* List riwayat per bulan */}
                <div className="space-y-6">
                    {Object.entries(riwayat).map(([bulan, films]) => {
                        const filtered = films.filter(f => {
                            if (activeFilter === 'Sudah dirating') return f.sudahRating;
                            if (activeFilter === 'Belum dirating') return !f.sudahRating;
                            return true;
                        });

                        if (filtered.length === 0) return null;

                        return (
                            <div key={bulan}>
                                {/* Nama Bulan (Contoh: APRIL 2025) */}
                                <div className="text-[10px] font-bold text-zinc-500 tracking-widest mb-3 uppercase">
                                    {bulan}
                                </div>
                                
                                {/* Container Item Card */}
                                <div className="flex flex-col gap-3">
                                    {filtered.map((film) => (
                                        <div 
                                            key={film.id} 
                                            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-700/80 transition group"
                                        >
                                            {/* Bagian Kiri: Kotak Gambar Placeholder & Info Film */}
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-14 bg-[#262626] border border-zinc-800 rounded flex items-center justify-center text-[9px] text-zinc-600 font-medium select-none text-center leading-tight transition group-hover:text-zinc-500">
                                                    Poster
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-white mb-0.5 group-hover:text-purple-400 transition">{film.judul}</div>
                                                    <div className="text-[11px] text-zinc-500 mb-2">
                                                        {film.genre} · {film.tahun} · {film.tanggal}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2">
                                                        {/* Badge Genre Ungu Minimalis */}
                                                        <span className="text-[10px] bg-[#222222] border border-zinc-800 px-2 py-0.5 rounded text-purple-400 font-medium">
                                                            {film.genre}
                                                        </span>
                                                        {/* Bintang Rating Kuning */}
                                                        {film.sudahRating && (
                                                            <div className="flex text-[10px] text-amber-500 tracking-tighter">
                                                                {Array.from({ length: 5 }).map((s, idx) => (
                                                                    <span 
                                                                        key={idx} 
                                                                        className={idx < film.rating ? 'text-amber-500' : 'text-zinc-700'}
                                                                    >
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bagian Kanan: Status Aksi & Tombol Violet */}
                                            <div className="text-right flex flex-col justify-between h-14 py-0.5">
                                                <span className={`text-[11px] font-medium ${
                                                    film.sudahRating ? 'text-emerald-500' : 'text-zinc-500'
                                                }`}>
                                                    {film.sudahRating ? 'Sudah dirating' : 'Belum dirating'}
                                                </span>
                                                
                                                {!film.sudahRating ? (
                                                    <button className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-medium px-3 py-1 rounded transition active:scale-95 shadow-sm shadow-purple-600/20">
                                                        Beri rating
                                                    </button>
                                                ) : (
                                                    <button className="text-[11px] text-purple-400 hover:text-purple-300 hover:underline transition">
                                                        Lihat detail →
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}