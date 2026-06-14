import { useState } from 'react';

export default function AdminFilm() {
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
        /* Pembungkus utama pengganti AdminLayout */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar/Sidebar Admin di sini */}

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-medium text-white">Kelola Film</h1>
                        <p className="text-sm text-zinc-400 mt-1">Total {films.length} film terdaftar</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition active:scale-95 shadow-sm shadow-purple-600/20"
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
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                </div>

                {/* Tabel film Container */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-zinc-300">
                            <thead className="bg-[#141414] border-b border-zinc-800">
                                <tr>
                                    <th className="text-left px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">No</th>
                                    <th className="text-left px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">Judul</th>
                                    <th className="text-left px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">Genre</th>
                                    <th className="text-left px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">Tahun</th>
                                    <th className="text-left px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">Rating</th>
                                    <th className="text-left px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">Status</th>
                                    <th className="text-right px-5 py-3 text-xs text-zinc-500 font-medium tracking-wider uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((film, index) => (
                                    <tr key={film.id} className="border-b border-zinc-800/50 hover:bg-[#222222]/50 transition-colors">
                                        <td className="px-5 py-3 text-zinc-500">{index + 1}</td>
                                        <td className="px-5 py-3 font-medium text-zinc-200">{film.judul}</td>
                                        <td className="px-5 py-3">
                                            <span className="text-[10px] bg-purple-950/50 text-purple-400 border border-purple-900/30 px-2.5 py-0.5 rounded-full font-medium">
                                                {film.genre}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-zinc-400">{film.tahun}</td>
                                        <td className="px-5 py-3 text-zinc-300">
                                            <span className="text-amber-500 mr-1 text-[10px]">★</span> {film.rating}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium border ${
                                                film.status === 'Aktif'
                                                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30'
                                                    : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                                            }`}>
                                                {film.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <button className="text-[11px] font-medium text-purple-400 hover:text-purple-300 hover:underline mr-3 transition">Edit</button>
                                            <button className="text-[11px] font-medium text-red-400/90 hover:text-red-400 hover:underline transition">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-zinc-500 text-sm">
                            Tidak ada film yang sesuai dengan pencarian
                        </div>
                    )}
                </div>
            </div>

            {/* Modal tambah film */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="font-medium text-base text-white mb-5">Tambah film baru</h2>
                        
                        <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                            <div className="mb-3">
                                <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Judul film</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                    placeholder="Masukkan judul film" 
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Genre</label>
                                    <select className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition cursor-pointer">
                                        <option value="Sci-Fi">Sci-Fi</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Aksi">Aksi</option>
                                        <option value="Komedi">Komedi</option>
                                        <option value="Horor">Horor</option>
                                        <option value="Animasi">Animasi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Tahun rilis</label>
                                    <input 
                                        type="number" 
                                        min="1900" max="2099" step="1"
                                        required
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                        placeholder="2024" 
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Sinopsis</label>
                                <textarea 
                                    className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition resize-none" 
                                    rows="3" 
                                    placeholder="Tuliskan sinopsis singkat..."
                                ></textarea>
                            </div>
                            
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95"
                                >
                                    Simpan Film
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}