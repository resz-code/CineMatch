import { useState } from 'react';

export default function AdminUsers() {
    const [search, setSearch] = useState('');

    // State data user
    const [users, setUsers] = useState([
        { id: 1, nama: 'Budi Santoso', email: 'budi@email.com', film: 47, rating: 32, genre: 'Sci-Fi, Drama', join: '1 Jan 2025', status: 'Aktif' },
        { id: 2, nama: 'Siti Rahayu', email: 'siti@email.com', film: 32, rating: 28, genre: 'Romansa, Drama', join: '5 Feb 2025', status: 'Aktif' },
        { id: 3, nama: 'Ahmad Fauzi', email: 'ahmad@email.com', film: 28, rating: 20, genre: 'Aksi, Thriller', join: '10 Mar 2025', status: 'Aktif' },
        { id: 4, nama: 'Dewi Kartika', email: 'dewi@email.com', film: 15, rating: 10, genre: 'Komedi, Animasi', join: '15 Mar 2025', status: 'Aktif' },
        { id: 5, nama: 'Rizky Pratama', email: 'rizky@email.com', film: 5, rating: 3, genre: 'Horor', join: '1 Apr 2025', status: 'Diblokir' },
    ]);

    // State penampung user yang akan diubah statusnya (null = tutup modal)
    const [userToToggle, setUserToToggle] = useState(null);

    // Fungsi eksekusi perubahan status setelah konfirmasi "Ya"
    const handleConfirmToggleStatus = () => {
        setUsers(prevUsers =>
            prevUsers.map(user => user.id === userToToggle.id 
                ? { ...user, status: user.status === 'Aktif' ? 'Diblokir' : 'Aktif' } 
                : user
            )
        );
        setUserToToggle(null);
    };

    // Filter pencarian nama / email
    const filtered = users.filter(u =>
        u.nama.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#141414] font-sans text-white">
            <div className="max-w-6xl mx-auto px-6 py-8">
                
                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-medium">Kelola User</h1>
                        <p className="text-sm text-zinc-400 mt-1">Total {users.length} pengguna terdaftar</p>
                    </div>
                </div>

                {/* Statistik Cepat */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 shadow-sm">
                        <div className="text-2xl font-bold mb-1">{users.length}</div>
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

                {/* Search Box */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 mb-4 shadow-sm">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama atau email..."
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* Tabel Kontainer */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-zinc-300">
                            <thead className="bg-[#141414] border-b border-zinc-800 text-xs text-zinc-500 font-medium tracking-wider uppercase">
                                <tr>
                                    <th className="text-left px-5 py-3">No</th>
                                    <th className="text-left px-5 py-3">Nama</th>
                                    <th className="text-left px-5 py-3">Genre favorit</th>
                                    <th className="text-left px-5 py-3">Film</th>
                                    <th className="text-left px-5 py-3">Rating</th>
                                    <th className="text-left px-5 py-3">Bergabung</th>
                                    <th className="text-left px-5 py-3">Status</th>
                                    <th className="text-right px-5 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-[#222222]/50 border-b border-zinc-800/50 transition-colors">
                                        <td className="px-5 py-3 text-zinc-500">{index + 1}</td>
                                        <td className="px-5 py-3">
                                            <div className="font-semibold text-zinc-200 text-xs">{user.nama}</div>
                                            <div className="text-[11px] text-zinc-500 font-medium mt-0.5">{user.email}</div>
                                        </td>
                                        <td className="px-5 py-3 text-xs text-zinc-400 font-medium">{user.genre}</td>
                                        <td className="px-5 py-3 font-medium text-zinc-300">{user.film}</td>
                                        <td className="px-5 py-3 font-medium text-zinc-300">{user.rating}</td>
                                        <td className="px-5 py-3 text-xs text-zinc-500">{user.join}</td>
                                        <td className="px-5 py-3">
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium border ${
                                                user.status === 'Aktif'
                                                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30'
                                                    : 'bg-red-950/30 text-red-400 border-red-900/30'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right text-xs">
                                            <button 
                                                onClick={() => setUserToToggle(user)}
                                                className={`font-medium hover:underline transition ${
                                                    user.status === 'Aktif' ? 'text-red-400/90 hover:text-red-400' : 'text-emerald-400 hover:text-emerald-300'
                                                }`}
                                            >
                                                {user.status === 'Aktif' ? 'Blokir' : 'Aktifkan'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-zinc-500 text-sm">Tidak ada user yang sesuai pencarian</div>
                    )}
                </div>
            </div>

            {/* MODAL POPOUP: KONFIRMASI UBAH STATUS USER (BLOKIR / AKTIFKAN) */}
            {userToToggle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-sm rounded-xl p-6 text-center shadow-xl">
                        {/* Ikon Peringatan */}
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
                                onClick={handleConfirmToggleStatus} 
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
        </div>
    );
}