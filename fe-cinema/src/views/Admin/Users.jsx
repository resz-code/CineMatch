import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import ConfirmModal from '../../Components/ConfirmModal';
import Notification from '../../Components/Notification';

export default function AdminUsers() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State Notifikasi
    const [toast, setToast] = useState({ message: '', type: 'success' });

    // State Modal Konfirmasi
    const [userToToggle, setUserToToggle] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // --- 1. Ambil data user Dari backend ---
    const fetchUsers = async () => {
        try {
            // Memanggil endpoint untuk mengambil semua user (role 'user') beserta relasinya
            const response = await axios.get('/admin/users');
            
            const formattedUsers = response.data.map((u) => ({
                id: u.id,
                nama: u.name,
                email: u.email,
                // Kita gunakan relasi interactions jika tersedia dari backend, jika tidak beri nilai 0
                film: u.interacted_films_count || 0,
                rating: u.ratings_count || 0,
                genre: u.genres && u.genres.length > 0 ? u.genres.map(g => g.nama).join(', ') : 'Belum memilih',
                join: new Date(u.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
                status: u.is_active ? 'Aktif' : 'Diblokir'
            }));
            
            setUsers(formattedUsers);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
            setToast({ message: 'Gagal memuat daftar pengguna.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter pencarian nama / email
    const filtered = users.filter(u =>
        u.nama.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    // --- 2. Buka modal konfirmasi ---
    const openToggleModal = (user) => {
        setUserToToggle(user);
        setIsConfirmOpen(true);
    };

    // --- 3. Eksekusi ubah status ke backend ---
    const handleConfirmToggleStatus = async () => {
        try {
            await axios.patch(`/admin/users/${userToToggle.id}/toggle-status`);
            
            setToast({ 
                message: `Status ${userToToggle.nama} berhasil diubah!`, 
                type: 'success' 
            });
            
            fetchUsers(); // Refresh data dari database
        } catch (error) {
            console.error("Gagal mengubah status user:", error);
            setToast({ message: 'Gagal mengubah status pengguna.', type: 'error' });
        } finally {
            setIsConfirmOpen(false);
            setUserToToggle(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] font-sans text-white relative">
            
            {/* Memanggil Komponen Notifikasi */}
            <Notification 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ message: '', type: '' })} 
            />

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
                    {isLoading ? (
                        <div className="text-center py-10 text-zinc-500 text-sm animate-pulse">Memuat daftar pengguna...</div>
                    ) : (
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
                                            <td className="px-5 py-3 text-[11px] text-zinc-400 font-medium max-w-[150px] truncate">{user.genre}</td>
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
                                                    onClick={() => openToggleModal(user)}
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
                    )}

                    {!isLoading && filtered.length === 0 && (
                        <div className="text-center py-10 text-zinc-500 text-sm">Tidak ada user yang sesuai pencarian</div>
                    )}
                </div>
            </div>

            {/* Menggunakan komponen reusable confirm modal */}
            <ConfirmModal 
                isOpen={isConfirmOpen}
                title={userToToggle?.status === 'Aktif' ? 'Blokir User?' : 'Aktifkan User?'}
                message={`Apakah Anda yakin untuk ${userToToggle?.status === 'Aktif' ? 'memblokir' : 'mengaktifkan kembali'} akun "${userToToggle?.nama}"?`}
                confirmText={userToToggle?.status === 'Aktif' ? 'Blokir' : 'Aktifkan'}
                onConfirm={handleConfirmToggleStatus}
                onCancel={() => { setIsConfirmOpen(false); setUserToToggle(null); }}
            />
            
        </div>
    );
}