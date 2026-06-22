import { useState } from 'react';

export default function AdminFilm() {
    const [search, setSearch] = useState('');
    const [filmList, setFilmList] = useState([
        { id: 1, judul: 'Interstellar', genre: 'Sci-Fi', tahun: 2014, rating: 4.8, status: 'Aktif' },
        { id: 2, judul: 'The Dark Knight', genre: 'Aksi', tahun: 2008, rating: 4.9, status: 'Aktif' },
        { id: 3, judul: 'Spirited Away', genre: 'Animasi', tahun: 2001, rating: 4.7, status: 'Aktif' },
        { id: 4, judul: 'Parasite', genre: 'Drama', tahun: 2019, rating: 4.6, status: 'Aktif' },
        { id: 5, judul: 'Inception', genre: 'Sci-Fi', tahun: 2010, rating: 4.8, status: 'Aktif' },
        { id: 6, judul: 'Oppenheimer', genre: 'Drama', tahun: 2023, rating: 4.7, status: 'Aktif' },
        { id: 7, judul: 'Dune Part Two', genre: 'Sci-Fi', tahun: 2024, rating: 4.5, status: 'Aktif' },
        { id: 8, judul: 'Past Lives', genre: 'Drama', tahun: 2023, rating: 4.4, status: 'Nonaktif' },
    ]);

    // State Kontrol Modal
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false); // Modal Baru untuk Status

    // State Penampung Data
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [newFilm, setNewFilm] = useState({ judul: '', genre: 'Sci-Fi', tahun: '', sinopsis: '' });

    // Filter Pencarian
    const filtered = filmList.filter(f =>
        f.judul.toLowerCase().includes(search.toLowerCase()) ||
        f.genre.toLowerCase().includes(search.toLowerCase())
    );

    // FUNGSI 1: Membuka Modal Konfirmasi Ubah Status
    const openStatusModal = (film) => {
        setSelectedFilm(film);
        setShowStatusModal(true);
    };

    // Eksekusi perubahan status setelah konfirmasi "Ya"
    const handleStatusConfirm = () => {
        setFilmList(prev => prev.map(f => 
            f.id === selectedFilm.id ? { ...f, status: f.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : f
        ));
        setShowStatusModal(false);
        setSelectedFilm(null);
    };

    // FUNGSI TRANSAKSI: Tambah Film Baru
    const handleAddSubmit = (e) => {
        e.preventDefault();
        const nextId = filmList.length > 0 ? Math.max(...filmList.map(f => f.id)) + 1 : 1;
        setFilmList([...filmList, {
            ...newFilm,
            id: nextId,
            tahun: parseInt(newFilm.tahun) || 2024,
            rating: 0.0,
            status: 'Aktif'
        }]);
        setNewFilm({ judul: '', genre: 'Sci-Fi', tahun: '', sinopsis: '' });
        setShowModal(false);
    };

    // FUNGSI 2: Edit Film
    const openEditModal = (film) => {
        setSelectedFilm({ ...film });
        setShowEditModal(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setFilmList(prev => prev.map(f => f.id === selectedFilm.id ? selectedFilm : f));
        setShowEditModal(false);
        setSelectedFilm(null);
    };

    // FUNGSI 3: Hapus Film
    const openDeleteModal = (film) => {
        setSelectedFilm(film);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        setFilmList(prev => prev.filter(f => f.id !== selectedFilm.id));
        setShowDeleteModal(false);
        setSelectedFilm(null);
    };

    return (
        <div className="min-h-screen bg-[#141414] font-sans text-white">
            <div className="max-w-6xl mx-auto px-6 py-8">
                
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-medium">Kelola Film</h1>
                        <p className="text-sm text-zinc-400 mt-1">Total {filmList.length} film terdaftar</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition active:scale-95 shadow-sm shadow-purple-600/20"
                    >
                        + Tambah film
                    </button>
                </div>

                {/* Search */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul atau genre..."
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* Table */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-zinc-300">
                            <thead className="bg-[#141414] border-b border-zinc-800 text-xs text-zinc-500 font-medium tracking-wider uppercase">
                                <tr>
                                    <th className="text-left px-5 py-3">No</th>
                                    <th className="text-left px-5 py-3">Judul</th>
                                    <th className="text-left px-5 py-3">Genre</th>
                                    <th className="text-left px-5 py-3">Tahun</th>
                                    <th className="text-left px-5 py-3">Rating</th>
                                    <th className="text-left px-5 py-3">Status</th>
                                    <th className="text-right px-5 py-3">Aksi</th>
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
                                            <button 
                                                onClick={() => openStatusModal(film)}
                                                className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium border transition transform active:scale-95 cursor-pointer ${
                                                    film.status === 'Aktif'
                                                        ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30 hover:bg-emerald-900/40'
                                                        : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-800'
                                                }`}
                                            >
                                                {film.status}
                                            </button>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <button onClick={() => openEditModal(film)} className="text-[11px] font-medium text-purple-400 hover:text-purple-300 hover:underline mr-3 transition">Edit</button>
                                            <button onClick={() => openDeleteModal(film)} className="text-[11px] font-medium text-red-400/90 hover:text-red-400 hover:underline transition">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-zinc-500 text-sm">Tidak ada film yang sesuai dengan pencarian</div>
                    )}
                </div>
            </div>

            {/* MODAL: TAMBAH FILM */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="font-medium text-base mb-5">Tambah film baru</h2>
                        <form onSubmit={handleAddSubmit}>
                            <div className="mb-3">
                                <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Judul film</label>
                                <input type="text" required value={newFilm.judul} onChange={(e) => setNewFilm({...newFilm, judul: e.target.value})} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" placeholder="Masukkan judul film" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Genre</label>
                                    <select value={newFilm.genre} onChange={(e) => setNewFilm({...newFilm, genre: e.target.value})} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition cursor-pointer">
                                        {['Sci-Fi', 'Drama', 'Aksi', 'Komedi', 'Horor', 'Animasi'].map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Tahun rilis</label>
                                    <input type="number" min="1900" max="2099" required value={newFilm.tahun} onChange={(e) => setNewFilm({...newFilm, tahun: e.target.value})} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" placeholder="2024" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Sinopsis</label>
                                <textarea value={newFilm.sinopsis} onChange={(e) => setNewFilm({...newFilm, sinopsis: e.target.value})} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition resize-none" rows="3" placeholder="Tuliskan sinopsis singkat..."></textarea>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowModal(false)} className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95">Batal</button>
                                <button type="submit" className="bg-purple-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">Simpan Film</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT FILM */}
            {showEditModal && selectedFilm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="font-medium text-base mb-5">Edit film</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-3">
                                <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Judul film</label>
                                <input type="text" required value={selectedFilm.judul} onChange={(e) => setSelectedFilm({ ...selectedFilm, judul: e.target.value })} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Genre</label>
                                    <select value={selectedFilm.genre} onChange={(e) => setSelectedFilm({ ...selectedFilm, genre: e.target.value })} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition cursor-pointer">
                                        {['Sci-Fi', 'Drama', 'Aksi', 'Komedi', 'Horor', 'Animasi'].map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Tahun rilis</label>
                                    <input type="number" min="1900" max="2099" required value={selectedFilm.tahun} onChange={(e) => setSelectedFilm({ ...selectedFilm, tahun: parseInt(e.target.value) || '' })} className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Sinopsis</label>
                                <textarea className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition resize-none" rows="3" placeholder="Tuliskan sinopsis singkat..." defaultValue=""></textarea>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => { setShowEditModal(false); setSelectedFilm(null); }} className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95">Batal</button>
                                <button type="submit" className="bg-purple-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">Simpan Film</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL POPOUP BARU: KONFIRMASI UBAH STATUS */}
            {showStatusModal && selectedFilm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
                        <p className="text-sm text-zinc-200 mb-6 font-medium">
                            Apakah anda yakin ingin mengubah status film <span className="text-purple-400">"{selectedFilm.judul}"</span> menjadi <span className={selectedFilm.status === 'Aktif' ? 'text-zinc-400' : 'text-emerald-400'}>"{selectedFilm.status === 'Aktif' ? 'Nonaktif' : 'Aktif'}"</span>?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => { setShowStatusModal(false); setSelectedFilm(null); }}
                                className="border border-zinc-700 text-zinc-400 px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95"
                            >
                                Batal
                            </button>
                            <button 
                                type="button"
                                onClick={handleStatusConfirm}
                                className="bg-purple-600 px-6 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95"
                            >
                                Ya
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: KONFIRMASI HAPUS */}
            {showDeleteModal && selectedFilm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
                        <p className="text-sm text-zinc-200 mb-6 font-medium">
                            Apakah anda yakin untuk menghapus film <span className="text-purple-400">"{selectedFilm.judul}"</span> ini?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button type="button" onClick={() => { setShowDeleteModal(false); setSelectedFilm(null); }} className="border border-zinc-700 text-zinc-400 px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95">Batal</button>
                            <button type="button" onClick={handleDeleteConfirm} className="bg-red-600 px-6 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm shadow-red-600/20 active:scale-95">Ya</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}