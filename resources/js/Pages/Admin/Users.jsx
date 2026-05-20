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
                    <h1 className="text-xl font-medium">Kelola User</h1>
                    <p className="text-sm text-gray-500 mt-1">Total {users.length} pengguna terdaftar</p>
                </div>
            </div>

            {/* Statistik cepat */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-2xl font-medium mb-1">{users.length}</div>
                    <div className="text-xs text-gray-500">Total user</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-2xl font-medium mb-1">{users.filter(u => u.status === 'Aktif').length}</div>
                    <div className="text-xs text-gray-500">User aktif</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <div className="text-2xl font-medium mb-1 text-red-500">{users.filter(u => u.status === 'Diblokir').length}</div>
                    <div className="text-xs text-gray-500">Diblokir</div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama atau email..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>

            {/* Tabel user */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">No</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Nama</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Genre favorit</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Film</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Rating</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Bergabung</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Status</th>
                            <th className="text-right px-5 py-3 text-xs text-gray-500 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user, index) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-5 py-3 text-gray-400">{index + 1}</td>
                                <td className="px-5 py-3">
                                    <div className="font-medium">{user.nama}</div>
                                    <div className="text-xs text-gray-400">{user.email}</div>
                                </td>
                                <td className="px-5 py-3 text-xs text-gray-500">{user.genre}</td>
                                <td className="px-5 py-3">{user.film}</td>
                                <td className="px-5 py-3">{user.rating}</td>
                                <td className="px-5 py-3 text-xs text-gray-500">{user.join}</td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        user.status === 'Aktif'
                                            ? 'bg-teal-100 text-teal-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    {user.status === 'Aktif' ? (
                                        <button className="text-xs text-red-500 hover:underline">Blokir</button>
                                    ) : (
                                        <button className="text-xs text-teal-600 hover:underline">Aktifkan</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
