import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    // Mengubah warna background badge icon stats menjadi lebih gelap dan serasi
    const stats = [
        { label: 'Total film', value: '1.240', icon: '🎬', color: 'bg-purple-950/50 text-purple-400 border border-purple-900/30' },
        { label: 'Total user', value: '328', icon: '👥', color: 'bg-blue-950/50 text-blue-400 border border-blue-900/30' },
        { label: 'Rating masuk', value: '4.891', icon: '⭐', color: 'bg-amber-950/50 text-amber-400 border border-amber-900/30' },
        { label: 'User aktif hari ini', value: '47', icon: '🟢', color: 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' },
    ];

    const recentFilms = [
        { id: 1, judul: 'Dune: Part Two', genre: 'Sci-Fi', rating: 4.5, status: 'Aktif' },
        { id: 2, judul: 'Oppenheimer', genre: 'Drama', rating: 4.7, status: 'Aktif' },
        { id: 3, judul: 'Past Lives', genre: 'Romansa', rating: 4.4, status: 'Aktif' },
        { id: 4, judul: 'Poor Things', genre: 'Komedi', rating: 4.2, status: 'Aktif' },
    ];

    const recentUsers = [
        { id: 1, nama: 'Budi Santoso', email: 'budi@email.com', film: 47, join: '1 Jan 2025' },
        { id: 2, nama: 'Siti Rahayu', email: 'siti@email.com', film: 32, join: '5 Feb 2025' },
        { id: 3, nama: 'Ahmad Fauzi', email: 'ahmad@email.com', film: 28, join: '10 Mar 2025' },
    ];

    return (
        /* Pembungkus utama pengganti AdminLayout */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar/Sidebar khusus Admin bisa letakkan di sini */}

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Header Dashboard */}
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-white tracking-wide">Dashboard Admin</h1>
                    <p className="text-xs text-zinc-500 mt-1">Overview sistem CineMatch</p>
                </div>

                {/* Statistik — Diubah menjadi kartu gelap berlatar #1a1a1a */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${s.color} text-lg mb-3.5`}>
                                {s.icon}
                            </div>
                            <div className="text-2xl font-bold text-white tracking-tight mb-1">{s.value}</div>
                            <div className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Status Model ML — Diubah menjadi kartu gelap berlatar #1a1a1a */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 mb-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">Status Model ML</h2>
                        <button className="bg-purple-950/40 text-purple-400 border border-purple-900/40 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-purple-900/30 transition-all duration-200">
                            🔄 Retrain model
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-[#222222]/60 border border-zinc-800/40 rounded-xl p-3.5">
                            <div className="text-[11px] text-zinc-500 mb-1">Model aktif</div>
                            <div className="text-sm font-semibold text-zinc-200">Collaborative Filtering v2</div>
                        </div>
                        <div className="bg-[#222222]/60 border border-zinc-800/40 rounded-xl p-3.5">
                            <div className="text-[11px] text-zinc-500 mb-1">Akurasi</div>
                            <div className="text-sm font-bold text-emerald-400">87.3%</div>
                        </div>
                        <div className="bg-[#222222]/60 border border-zinc-800/40 rounded-xl p-3.5">
                            <div className="text-[11px] text-zinc-500 mb-1">Terakhir dilatih</div>
                            <div className="text-sm font-semibold text-zinc-300">3 hari lalu</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Film terbaru */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">Film terbaru</h2>
                            <Link to="/admin/film" className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline transition">Lihat semua →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-800">
                                        <th className="text-left text-[11px] text-zinc-500 font-semibold uppercase tracking-wider pb-2.5">Judul</th>
                                        <th className="text-left text-[11px] text-zinc-500 font-semibold uppercase tracking-wider pb-2.5">Genre</th>
                                        <th className="text-right text-[11px] text-zinc-500 font-semibold uppercase tracking-wider pb-2.5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {recentFilms.map((film) => (
                                        <tr key={film.id} className="hover:bg-[#222222]/20 transition-colors">
                                            <td className="py-3 text-xs font-semibold text-zinc-200">{film.judul}</td>
                                            <td className="py-3">
                                                <span className="text-[10px] bg-purple-950/50 text-purple-400 border border-purple-900/30 px-2.5 py-0.5 rounded-full font-medium">
                                                    {film.genre}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right text-xs">
                                                <span className="text-purple-400 cursor-pointer hover:text-purple-300 font-medium hover:underline mr-2.5 transition">Edit</span>
                                                <span className="text-red-400/90 cursor-pointer hover:text-red-400 font-medium hover:underline transition">Hapus</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* User terbaru */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">User terbaru</h2>
                            <Link to="/admin/users" className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline transition">Lihat semua →</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-800">
                                        <th className="text-left text-[11px] text-zinc-500 font-semibold uppercase tracking-wider pb-2.5">Nama</th>
                                        <th className="text-left text-[11px] text-zinc-500 font-semibold uppercase tracking-wider pb-2.5">Film</th>
                                        <th className="text-right text-[11px] text-zinc-500 font-semibold uppercase tracking-wider pb-2.5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-[#222222]/20 transition-colors">
                                            <td className="py-3">
                                                <div className="text-xs font-semibold text-zinc-200">{user.nama}</div>
                                                <div className="text-[11px] text-zinc-500 font-medium">{user.email}</div>
                                            </td>
                                            <td className="py-3 text-xs font-medium text-zinc-400">{user.film}</td>
                                            <td className="py-3 text-right text-xs">
                                                <span className="text-red-400/90 cursor-pointer hover:text-red-400 font-medium hover:underline transition">Blokir</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}