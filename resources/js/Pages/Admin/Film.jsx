import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminFilm({ auth }) {
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    const films = [
        { id: 1, judul: 'Interstellar', genre: 'Sci-Fi', tahun: 2014, rating: 4.8, status: 'Aktif' },
        { id: 2, judul: 'The Dark Knight', genre: 'Aksi', tahun: 2008, rating: 4.9, status: 'Aktif' },
        { id: 3, judul: 'Spirited Away', genre: 'Animasi', tahun: 2001, rating: 4.7, status: 'Aktif' },
        { id: 4, judul: 'Parasite', genre: 'Drama', tahun: 2019, rating: 4.6, status: 'Aktif' },
        { id: 5, judul: 'Inception', genre: 'Sci-Fi', tahun: 2010, rating: 4.8, status: 'Aktif' },
        { id: 6, judul: 'Oppenheimer', genre: 'Drama', tahun: 2023, rating: 4.7, status: 'Aktif' },
        { id: 7, judul: 'Dune Part Two', genre: 'Sci-Fi', tahun: 2024, rating: 4.5, status: 'Aktif' },
        { id: 8, judul: 'Past Lives', genre: 'Drama', tahun: 2023, rating: 4.4, status: 'Nonaktif' },
    ];

    const filtered = films.filter(f =>
        f.judul.toLowerCase().includes(search.toLowerCase()) ||
        f.genre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Kelola Film — CineMatch" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-medium">Kelola Film</h1>
                    <p className="text-sm text-gray-500 mt-1">Total {films.length} film terdaftar</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                >
                    + Tambah film
                </button>
            </div>

            {/* Search */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul atau genre..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
            </div>

            {/* Tabel film */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">No</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Judul</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Genre</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Tahun</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Rating</th>
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">Status</th>
                            <th className="text-right px-5 py-3 text-xs text-gray-500 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((film, index) => (
                            <tr key={film.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-5 py-3 text-gray-400">{index + 1}</td>
                                <td className="px-5 py-3 font-medium">{film.judul}</td>
                                <td className="px-5 py-3">
                                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                        {film.genre}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-gray-500">{film.tahun}</td>
                                <td className="px-5 py-3">
                                    <span className="text-yellow-500">★</span> {film.rating}
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        film.status === 'Aktif'
                                            ? 'bg-teal-100 text-teal-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {film.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <button className="text-xs text-purple-600 hover:underline mr-3">Edit</button>
                                    <button className="text-xs text-red-500 hover:underline">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        Tidak ada film yang sesuai pencarian
                    </div>
                )}
            </div>

            {/* Modal tambah film */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h2 className="font-medium text-base mb-5">Tambah film baru</h2>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Judul film</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Judul film" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Genre</label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                                <option>Sci-Fi</option>
                                <option>Drama</option>
                                <option>Aksi</option>
                                <option>Komedi</option>
                                <option>Horor</option>
                                <option>Animasi</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Tahun rilis</label>
                            <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="2024" />
                        </div>
                        <div className="mb-5">
                            <label className="block text-sm text-gray-600 mb-1">Sinopsis</label>
                            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" rows="3" placeholder="Sinopsis singkat..."></textarea>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                                Simpan
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
