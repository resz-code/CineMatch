import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminUsers({ auth }) {
    const [search, setSearch] = useState('');

    const users = [
        { id: 1, nama: 'Budi Santoso', email: 'budi@email.com', film: 47, rating: 32, genre: 'Sci-Fi, Drama', join: '1 Jan 2025', status: 'Aktif' },
        { id: 2, nama: 'Siti Rahayu', email: 'siti@email.com', film: 32, rating: 28, genre: 'Romansa, Drama', join: '5 Feb 2025', status: 'Aktif' },
        { id: 3, nama: 'Ahmad Fauzi', email: 'ahmad@email.com', film: 28, rating: 20, genre: 'Aksi, Thriller', join: '10 Mar 2025', status: 'Aktif' },
        { id: 4, nama: 'Dewi Kartika', email: 'dewi@email.com', film: 15, rating: 10, genre: 'Komedi, Animasi', join: '15 Mar 2025', status: 'Aktif' },
        { id: 5, nama: 'Rizky Pratama', email: 'rizky@email.com', film: 5, rating: 3, genre: 'Horor', join: '1 Apr 2025', status: 'Diblokir' },
    ];

    const filtered = users.filter(u =>
        u.nama.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Kelola User — CineMatch" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-medium text-white">Kelola User</h1>
                    <p className="text-sm text-zinc-400 mt-1">Total {users.length} pengguna terdaftar</p>
                </div>
            </div>

            {/* Statistik cepat — Diubah ke kartu gelap berlatar #1a1a1a */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-white mb-1">{users.length}</div>
                    <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Total user</div>
                </div>
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">{users.filter(u => u.status === 'Aktif').length}</div>
                    <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide">User aktif</div>
                </div>
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-red-500 mb-1">{users.filter(u => u.status === 'Diblokir').length}</div>
                    <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Diblokir</div>
                </div>
            </div>

            {/* Search Container */}
            <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama atau email..."
                    className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </div>

            {/* Tabel user Container */}
            <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-zinc-300">
                    <thead className="bg-[#141414] border-b border-zinc-800">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">No</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Nama</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Genre favorit</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Film</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Rating</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Bergabung</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Status</th>
                            <th className="text-right px-5 py-3 text-xs text-zinc-400 font-medium uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {filtered.map((user, index) => (
                            <tr key={user.id} className="hover:bg-[#222222]/20 transition-colors">
                                <td className="px-5 py-3 text-zinc-500">{index + 1}</td>
                                <td className="px-5 py-3">
                                    <div className="font-semibold text-white text-xs">{user.nama}</div>
                                    <div className="text-[11px] text-zinc-500 font-medium mt-0.5">{user.email}</div>
                                </td>
                                <td className="px-5 py-3 text-xs text-zinc-400 font-medium">{user.genre}</td>
                                <td className="px-5 py-3 font-medium text-zinc-300">{user.film}</td>
                                <td className="px-5 py-3 font-medium text-zinc-300">{user.rating}</td>
                                <td className="px-5 py-3 text-xs text-zinc-500">{user.join}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                        user.status === 'Aktif'
                                            ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30'
                                            : 'bg-red-950/50 text-red-400 border border-red-900/30'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right text-xs">
                                    {user.status === 'Aktif' ? (
                                        <button className="text-red-400/90 hover:text-red-400 font-medium hover:underline transition">Blokir</button>
                                    ) : (
                                        <button className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition">Aktifkan</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-10 text-zinc-500 text-sm">
                        Tidak ada user yang sesuai pencarian
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}