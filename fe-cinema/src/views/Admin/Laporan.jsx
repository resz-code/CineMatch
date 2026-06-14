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
        /* Pembungkus utama pengganti AdminLayout */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar/Sidebar Admin di sini */}

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-white">Laporan & Analitik</h1>
                    <p className="text-sm text-zinc-400 mt-1">Ringkasan aktivitas sistem minggu ini</p>
                </div>

                {/* Ringkasan minggu ini — Kartu Gelap */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'User aktif minggu ini', value: '384', change: '+12%' },
                        { label: 'Rating baru', value: '1.130', change: '+8%' },
                        { label: 'Film baru ditambah', value: '24', change: '+5%' },
                        { label: 'Rekomendasi diberikan', value: '9.847', change: '+15%' },
                    ].map((s) => (
                        <div key={s.label} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 shadow-sm transition hover:border-zinc-700/80">
                            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                            <div className="text-xs text-zinc-400 mb-1">{s.label}</div>
                            <div className="text-xs text-emerald-400 font-medium">{s.change} dari minggu lalu</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Grafik aktivitas harian (Bar Chart Gelap) */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                        <h2 className="font-medium text-sm text-zinc-300 mb-4">Aktivitas harian (user aktif)</h2>
                        <div className="flex items-end gap-2 h-32 pt-2">
                            {aktivitasHarian.map((a) => (
                                <div key={a.hari} className="flex-1 flex flex-col items-center gap-1 group">
                                    <div className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium mb-1">
                                        {a.user}
                                    </div>
                                    <div
                                        className="w-full bg-purple-600 rounded-t-md hover:bg-purple-500 transition-colors shadow-[0_0_10px_rgba(147,51,234,0.15)]"
                                        style={{ height: `${(a.user / maxUser) * 100}px` }}
                                    />
                                    <div className="text-xs text-zinc-500 mt-1">{a.hari.slice(0,3)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top film List Container */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                        <h2 className="font-medium text-sm text-zinc-300 mb-4">Film paling banyak ditonton</h2>
                        <div className="flex flex-col gap-3">
                            {topFilm.map((film, index) => (
                                <div key={film.judul} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-950/50 border border-purple-800/30 text-purple-400 text-xs flex items-center justify-center font-semibold shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{film.judul}</div>
                                        <div className="w-full bg-[#141414] rounded-full h-1 mt-1 border border-zinc-800/50 overflow-hidden">
                                            <div
                                                className="bg-purple-500 h-1 rounded-full shadow-[0_0_6px_rgba(147,51,234,0.3)]"
                                                style={{ width: `${(film.ditonton / topFilm[0].ditonton) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-xs text-zinc-400 font-medium">{film.ditonton}x</div>
                                    <div className="text-xs text-amber-500 font-medium tracking-tight">★ {film.rating}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabel aktivitas harian lengkap */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                    <h2 className="font-medium text-sm text-zinc-300 mb-4">Detail aktivitas harian</h2>
                    <table className="w-full text-sm text-zinc-300">
                        <thead className="border-b border-zinc-800">
                            <tr>
                                <th className="text-left text-xs text-zinc-500 font-semibold pb-3 uppercase tracking-wider">Hari</th>
                                <th className="text-left text-xs text-zinc-500 font-semibold pb-3 uppercase tracking-wider">User aktif</th>
                                <th className="text-left text-xs text-zinc-500 font-semibold pb-3 uppercase tracking-wider">Rating masuk</th>
                                <th className="text-left text-xs text-zinc-500 font-semibold pb-3 uppercase tracking-wider">Rata-rata rating</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/40">
                            {aktivitasHarian.map((a) => (
                                <tr key={a.hari} className="hover:bg-[#222222]/50 transition-colors">
                                    <td className="py-3 font-semibold text-zinc-200">{a.hari}</td>
                                    <td className="py-3 font-medium text-zinc-400">{a.user}</td>
                                    <td className="py-3 font-medium text-zinc-400">{a.rating}</td>
                                    <td className="py-3 text-amber-500 font-medium tracking-tight">★ {(a.rating / a.user).toFixed(1)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}