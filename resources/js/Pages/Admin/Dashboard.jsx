import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard({ auth }) {
    const stats = [
        { label: 'Total film', value: '1.240', icon: '🎬', color: 'bg-purple-50 text-purple-700' },
        { label: 'Total user', value: '328', icon: '👥', color: 'bg-blue-50 text-blue-700' },
        { label: 'Rating masuk', value: '4.891', icon: '⭐', color: 'bg-yellow-50 text-yellow-700' },
        { label: 'User aktif hari ini', value: '47', icon: '🟢', color: 'bg-teal-50 text-teal-700' },
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
        <AdminLayout>
            <Head title="Dashboard Admin — CineMatch" />

            <div className="mb-6">
                <h1 className="text-xl font-medium">Dashboard Admin</h1>
                <p className="text-sm text-gray-500 mt-1">Overview sistem CineMatch</p>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                    <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${s.color} text-xl mb-3`}>
                            {s.icon}
                        </div>
                        <div className="text-2xl font-medium mb-1">{s.value}</div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Status Model ML */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-medium text-sm">Status Model ML</h2>
                    <button className="bg-teal-50 text-teal-700 border border-teal-200 text-xs px-3 py-1.5 rounded-lg hover:bg-teal-100 transition">
                        🔄 Retrain model
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Model aktif</div>
                        <div className="text-sm font-medium">Collaborative Filtering v2</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Akurasi</div>
                        <div className="text-sm font-medium text-teal-600">87.3%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Terakhir dilatih</div>
                        <div className="text-sm font-medium">3 hari lalu</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">

                {/* Film terbaru */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-medium text-sm">Film terbaru</h2>
                        <a href="/admin/film" className="text-xs text-purple-600 hover:underline">Lihat semua →</a>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs text-gray-400 font-medium pb-2">Judul</th>
                                <th className="text-left text-xs text-gray-400 font-medium pb-2">Genre</th>
                                <th className="text-right text-xs text-gray-400 font-medium pb-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentFilms.map((film) => (
                                <tr key={film.id} className="border-b border-gray-50">
                                    <td className="py-2 text-sm font-medium">{film.judul}</td>
                                    <td className="py-2">
                                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                            {film.genre}
                                        </span>
                                    </td>
                                    <td className="py-2 text-right">
                                        <span className="text-xs text-purple-600 cursor-pointer hover:underline mr-2">Edit</span>
                                        <span className="text-xs text-red-500 cursor-pointer hover:underline">Hapus</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* User terbaru */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-medium text-sm">User terbaru</h2>
                        <a href="/admin/users" className="text-xs text-purple-600 hover:underline">Lihat semua →</a>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs text-gray-400 font-medium pb-2">Nama</th>
                                <th className="text-left text-xs text-gray-400 font-medium pb-2">Film</th>
                                <th className="text-right text-xs text-gray-400 font-medium pb-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50">
                                    <td className="py-2">
                                        <div className="text-sm font-medium">{user.nama}</div>
                                        <div className="text-xs text-gray-400">{user.email}</div>
                                    </td>
                                    <td className="py-2 text-sm">{user.film}</td>
                                    <td className="py-2 text-right">
                                        <span className="text-xs text-red-500 cursor-pointer hover:underline">Blokir</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
