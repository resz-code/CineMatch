import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    // Data statistik atas
    const stats = [
        { label: 'Total film', value: '1.240', icon: '🎬', color: 'bg-purple-950/50 text-purple-400 border border-purple-900/30' },
        { label: 'Total user', value: '328', icon: '👥', color: 'bg-blue-950/50 text-blue-400 border border-blue-900/30' },
        { label: 'Rating masuk', value: '4.891', icon: '⭐', color: 'bg-amber-950/50 text-amber-400 border border-amber-900/30' },
        { label: 'User aktif hari ini', value: '47', icon: '🟢', color: 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' },
    ];

    // Pilihan genre dropdown
    const listGenre = ['Sci-Fi', 'Drama', 'Romansa', 'Komedi', 'Aksi', 'Horor', 'Animasi'];

    // State data dummy untuk film dan user
    const [recentFilms, setRecentFilms] = useState([
        { id: 1, judul: 'Dune: Part Two', genre: 'Sci-Fi' },
        { id: 2, judul: 'Oppenheimer', genre: 'Drama' },
        { id: 3, judul: 'Past Lives', genre: 'Romansa' },
        { id: 4, judul: 'Poor Things', genre: 'Komedi' },
    ]);

    const [recentUsers, setRecentUsers] = useState([
        { id: 1, nama: 'Budi Santoso', email: 'budi@email.com', film: 47, status: 'Aktif' },
        { id: 2, nama: 'Siti Rahayu', email: 'siti@email.com', film: 32, status: 'Aktif' },
        { id: 3, nama: 'Ahmad Fauzi', email: 'ahmad@email.com', film: 28, status: 'Aktif' },
    ]);

    // State kontrol modal pop-up
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [filmToDelete, setFilmToDelete] = useState(null);
    const [userToToggle, setUserToToggle] = useState(null);

    // Fungsi simpan perubahan edit film
    const handleSaveEditFilm = (e) => {
        e.preventDefault();
        setRecentFilms(prev => prev.map(f => f.id === selectedFilm.id ? selectedFilm : f));
        setSelectedFilm(null);
    };

    // Fungsi hapus film
    const handleConfirmDeleteFilm = () => {
        setRecentFilms(prev => prev.filter(f => f.id !== filmToDelete.id));
        setFilmToDelete(null);
    };

    // Fungsi buka konfirmasi status user
    const openToggleUserModal = (user) => {
        setUserToToggle(user);
    };

    // Fungsi eksekusi ganti status user (aktif / blokir)
    const handleConfirmToggleUserStatus = () => {
        setRecentUsers(prev => prev.map(u => 
            u.id === userToToggle.id ? { ...u, status: u.status === 'Aktif' ? 'Diblokir' : 'Aktif' } : u
        ));
        setUserToToggle(null);
    };

    return (
        <>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-white tracking-wide">Dashboard Admin</h1>
                <p className="text-xs text-zinc-500 mt-1">Overview sistem CineMatch</p>
            </div>

            {/* Grid statistik */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                    <div key={s.label} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${s.color} text-lg mb-3.5`}>{s.icon}</div>
                        <div className="text-2xl font-bold text-white tracking-tight mb-1">{s.value}</div>
                        <div className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Status Model Machine Learning */}
            <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">Status Model ML</h2>
                    <button className="bg-purple-950/40 text-purple-400 border border-purple-900/40 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-purple-900/30 transition">🔄 Retrain model</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-[#222222]/60 border border-zinc-800/40 rounded-xl p-3.5">
                        <div className="text-zinc-500 mb-1">Model aktif</div>
                        <div className="font-semibold text-zinc-200">Collaborative Filtering v2</div>
                    </div>
                    <div className="bg-[#222222]/60 border border-zinc-800/40 rounded-xl p-3.5">
                        <div className="text-zinc-500 mb-1">Akurasi</div>
                        <div className="font-bold text-emerald-400">87.3%</div>
                    </div>
                    <div className="bg-[#222222]/60 border border-zinc-800/40 rounded-xl p-3.5">
                        <div className="text-zinc-500 mb-1">Terakhir dilatih</div>
                        <div className="font-semibold text-zinc-300">3 hari lalu</div>
                    </div>
                </div>
            </div>

            {/* Konten Utama Tabel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tabel Film */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">Film terbaru</h2>
                        <Link to="/admin/film" className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline transition">Lihat semua →</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
                                    <th className="text-left pb-2.5">Judul</th>
                                    <th className="text-left pb-2.5">Genre</th>
                                    <th className="text-right pb-2.5">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {recentFilms.map((film) => (
                                    <tr key={film.id} className="hover:bg-[#222222]/20 transition-colors">
                                        <td className="py-3 text-xs font-semibold text-zinc-200">{film.judul}</td>
                                        <td className="py-3">
                                            <span className="text-[10px] bg-purple-950/50 text-purple-400 border border-purple-900/30 px-2.5 py-0.5 rounded-full font-medium">{film.genre}</span>
                                        </td>
                                        <td className="py-3 text-right text-xs font-medium">
                                            <span onClick={() => setSelectedFilm(film)} className="text-purple-400 cursor-pointer hover:text-purple-300 hover:underline mr-2.5 transition">Edit</span>
                                            <span onClick={() => setFilmToDelete(film)} className="text-red-400/90 cursor-pointer hover:text-red-400 hover:underline transition">Hapus</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabel User */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-xs text-zinc-400 uppercase tracking-wider">User terbaru</h2>
                        <Link to="/admin/users" className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline transition">Lihat semua →</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
                                    <th className="text-left pb-2.5">Nama</th>
                                    <th className="text-left pb-2.5">Film</th>
                                    <th className="text-right pb-2.5">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {recentUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-[#222222]/20 transition-colors">
                                        <td className="py-3">
                                            <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                                                {user.nama}
                                                {user.status === 'Diblokir' && <span className="text-[9px] bg-red-950/40 text-red-400 border border-red-900/30 px-1.5 py-0.2 rounded">Banned</span>}
                                            </div>
                                            <div className="text-[11px] text-zinc-500 font-medium">{user.email}</div>
                                        </td>
                                        <td className="py-3 text-xs font-medium text-zinc-400">{user.film}</td>
                                        <td className="py-3 text-right text-xs font-medium">
                                            <span onClick={() => openToggleUserModal(user)} className={`cursor-pointer hover:underline transition ${user.status === 'Diblokir' ? 'text-emerald-400 hover:text-emerald-300' : 'text-red-400/90 hover:text-red-400'}`}>
                                                {user.status === 'Diblokir' ? 'Aktifkan' : 'Blokir'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Edit Film */}
            {selectedFilm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-md rounded-xl p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Edit Data Film</h3>
                            <button onClick={() => setSelectedFilm(null)} className="text-zinc-500 hover:text-zinc-300 text-lg transition">✕</button>
                        </div>
                        <form onSubmit={handleSaveEditFilm} className="space-y-4">
                            <div>
                                <label className="block text-[11px] text-zinc-400 font-medium uppercase tracking-wide mb-1.5">Judul Film</label>
                                <input 
                                    type="text" 
                                    value={selectedFilm.judul} 
                                    onChange={(e) => setSelectedFilm({ ...selectedFilm, judul: e.target.value })} 
                                    className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 transition" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] text-zinc-400 font-medium uppercase tracking-wide mb-1.5">Genre</label>
                                <select 
                                    value={selectedFilm.genre} 
                                    onChange={(e) => setSelectedFilm({ ...selectedFilm, genre: e.target.value })} 
                                    className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 transition cursor-pointer"
                                >
                                    {listGenre.map(g => <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>)}
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setSelectedFilm(null)} className="bg-zinc-800 text-zinc-300 text-xs font-medium px-4 py-2 rounded-lg hover:bg-zinc-700 transition">Batal</button>
                                <button type="submit" className="bg-purple-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-purple-500 transition">Simpan Perubahan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Hapus Film */}
            {filmToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-sm rounded-xl p-6 text-center shadow-xl">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/50 border border-red-900/30 text-red-400 text-xl mb-4">⚠️</div>
                        <h3 className="text-base font-bold text-white mb-2">Hapus Film?</h3>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">Apakah anda yakin ingin menghapus film <span className="text-white font-semibold">"{filmToDelete.judul}"</span>?</p>
                        <div className="flex justify-center gap-3">
                            <button type="button" onClick={() => setFilmToDelete(null)} className="w-1/2 bg-zinc-800 border border-zinc-700/50 text-zinc-300 text-xs font-medium py-2.5 rounded-lg hover:bg-zinc-700 transition">Batal</button>
                            <button type="button" onClick={handleConfirmDeleteFilm} className="w-1/2 bg-red-600 text-white text-xs font-medium py-2.5 rounded-lg hover:bg-red-500 transition">Hapus</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Pop-up Ganti Status User (Blokir / Aktifkan) */}
            {userToToggle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-sm rounded-xl p-6 text-center shadow-xl">
                        {/* Segitiga Ikon Peringatan Oranye senada gambar mockup */}
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-950/50 border border-amber-900/30 text-amber-500 text-xl mb-4">⚠️</div>
                        <h3 className="text-base font-bold text-white mb-2">
                            {userToToggle.status === 'Aktif' ? 'Blokir User?' : 'Aktifkan User?'}
                        </h3>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                            Apakah anda yakin untuk {userToToggle.status === 'Aktif' ? 'memblokir' : 'mengaktifkan kembali'} akun <span className="text-white font-semibold">"{userToToggle.nama}"</span>?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button 
                                type="button" 
                                onClick={() => setUserToToggle(null)} 
                                className="w-1/2 bg-zinc-800 border border-zinc-700/50 text-zinc-300 text-xs font-medium py-2.5 rounded-lg hover:bg-zinc-700 transition"
                            >
                                Batal
                            </button>
                            <button 
                                type="button" 
                                onClick={handleConfirmToggleUserStatus} 
                                className={`w-1/2 text-white text-xs font-medium py-2.5 rounded-lg transition ${
                                    userToToggle.status === 'Aktif' ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'
                                }`}
                            >
                                {userToToggle.status === 'Aktif' ? 'Blokir' : 'Aktifkan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}