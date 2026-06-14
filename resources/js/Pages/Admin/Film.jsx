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
        { id: 7, presidential: 'Dune Part Two', judul: 'Dune Part Two', genre: 'Sci-Fi', tahun: 2024, rating: 4.5, status: 'Aktif' },
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
                    <h1 className="text-xl font-medium text-white">Kelola Film</h1>
                    <p className="text-sm text-zinc-400 mt-1">Total {films.length} film terdaftar</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition"
                >
                    + Tambah film
                </button>
            </div>

            {/* Search Container */}
            <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul atau genre..."
                    className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </div>

            {/* Tabel film Container */}
            <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden">
                <table className="w-full text-sm text-zinc-300">
                    <thead className="bg-[#141414] border-b border-zinc-800">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium">No</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium">Judul</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium">Genre</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium">Tahun</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium">Rating</th>
                            <th className="text-left px-5 py-3 text-xs text-zinc-400 font-medium">Status</th>
                            <th className="text-right px-5 py-3 text-xs text-zinc-400 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((film, index) => (
                            <tr key={film.id} className="border-b border-zinc-800/50 hover:bg-[#222222] transition-colors">
                                <td className="px-5 py-3 text-zinc-500">{index + 1}</td>
                                <td className="px-5 py-3 font-medium text-white">{film.judul}</td>
                                <td className="px-5 py-3">
                                    <span className="text-xs bg-purple-950/50 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded-full">
                                        {film.genre}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-zinc-400">{film.tahun}</td>
                                <td className="px-5 py-3 text-zinc-300">
                                    <span className="text-yellow-500">★</span> {film.rating}
                                </td>
                                <td className="px-5 py-3">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        film.status === 'Aktif'
                                            ? 'bg-teal-950/50 text-teal-300 border border-teal-800/50'
                                            : 'bg-red-950/50 text-red-300 border border-red-800/50'
                                    }`}>
                                        {film.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <button className="text-xs text-purple-400 hover:text-purple-300 hover:underline mr-3">Edit</button>
                                    <button className="text-xs text-red-400 hover:text-red-300 hover:underline">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-10 text-zinc-500 text-sm">
                        Tidak ada film yang sesuai pencarian
                    </div>
                )}
            </div>

            {/* Modal tambah film */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h2 className="font-medium text-base text-white mb-5">Tambah film baru</h2>
                        <div className="mb-3">
                            <label className="block text-sm text-zinc-400 mb-1">Judul film</label>
                            <input 
                                type="text" 
                                className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                placeholder="Judul film" 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-zinc-400 mb-1">Genre</label>
                            <select className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option className="bg-[#1a1a1a]">Sci-Fi</option>
                                <option className="bg-[#1a1a1a]">Drama</option>
                                <option className="bg-[#1a1a1a]">Aksi</option>
                                <option className="bg-[#1a1a1a]">Komedi</option>
                                <option className="bg-[#1a1a1a]">Horor</option>
                                <option className="bg-[#1a1a1a]">Animasi</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm text-zinc-400 mb-1">Tahun rilis</label>
                            <input 
                                type="number" 
                                className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                placeholder="2024" 
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block text-sm text-zinc-400 mb-1">Sinopsis</label>
                            <textarea 
                                className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                rows="3" 
                                placeholder="Sinopsis singkat..."
                            ></textarea>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                                Simpan
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm hover:bg-zinc-800 hover:text-white transition"
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