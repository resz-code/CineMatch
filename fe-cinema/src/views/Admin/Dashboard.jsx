import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import ConfirmModal from '../../Components/ConfirmModal';
import Notification from '../../Components/Notification';

export default function AdminDashboard() {
    const navigate = useNavigate();

    // State Data Utama
    const [films, setFilms] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // State Notifikasi & Modal
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const [filmToDelete, setFilmToDelete] = useState(null);
    const [userToToggle, setUserToToggle] = useState(null);

    // --- 1. Ambil data API secara bersamaan ---
    const fetchDashboardData = async () => {
        try {
            const [filmsRes, usersRes] = await Promise.all([
                axios.get('/films'),
                axios.get('/admin/users')
            ]);
            setFilms(filmsRes.data);
            setUsers(usersRes.data);
        } catch (error) {
            console.error("Gagal mengambil data dashboard:", error);
            setToast({ message: 'Gagal memuat data dashboard.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // --- 2. Kalkulasi statistik otomatis ---
    const statsData = useMemo(() => {
        const totalFilm = films.length;
        const totalUser = users.length;
        // Menjumlahkan semua rating yang pernah diberikan user
        const totalRating = users.reduce((acc, curr) => acc + (curr.ratings_count || 0), 0);
        // Menghitung user yang status is_active nya true
        const activeUsers = users.filter(u => u.is_active).length;

        return [
            { label: 'Total film', value: totalFilm.toLocaleString('id-ID'), icon: '🎬', color: 'bg-purple-950/50 text-purple-400 border border-purple-900/30' },
            { label: 'Total user', value: totalUser.toLocaleString('id-ID'), icon: '👥', color: 'bg-blue-950/50 text-blue-400 border border-blue-900/30' },
            { label: 'Rating masuk', value: totalRating.toLocaleString('id-ID'), icon: '⭐', color: 'bg-amber-950/50 text-amber-400 border border-amber-900/30' },
            { label: 'User Aktif', value: activeUsers.toLocaleString('id-ID'), icon: '🟢', color: 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' },
        ];
    }, [films, users]);

    // Ambil 4 film terbaru (asumsi ID terbesar adalah yang terbaru)
    const recentFilms = [...films].sort((a, b) => b.id - a.id).slice(0, 4);
    
    // Ambil 3 user terbaru
    const recentUsers = users.slice(0, 3);

    // --- 3. Handler aksi cepat ---
    const handleConfirmDeleteFilm = async () => {
        try {
            await axios.delete(`/admin/films/${filmToDelete.id}`);
            setToast({ message: 'Film berhasil dihapus!', type: 'success' });
            fetchDashboardData();
        } catch (error) {
            setToast({ message: 'Gagal menghapus film.', type: 'error' });
        } finally {
            setFilmToDelete(null);
        }
    };

    const handleConfirmToggleUserStatus = async () => {
        try {
            await axios.patch(`/admin/users/${userToToggle.id}/toggle-status`);
            setToast({ message: 'Status user berhasil diubah!', type: 'success' });
            fetchDashboardData();
        } catch (error) {
            setToast({ message: 'Gagal mengubah status user.', type: 'error' });
        } finally {
            setUserToToggle(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-sans">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 text-sm animate-pulse tracking-wide">Menyiapkan pusat komando...</p>
            </div>
        );
    }

    return (
        <>
            <Notification 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ message: '', type: '' })} 
            />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-white tracking-wide">Dashboard Admin</h1>
                <p className="text-xs text-zinc-500 mt-1">Overview sistem CineMatch</p>
            </div>

            {/* Grid statistik */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statsData.map((s) => (
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
                    <Link to="/admin/model" className="bg-purple-950/40 text-purple-400 border border-purple-900/40 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-purple-900/30 transition">
                        Kelola Model
                    </Link>
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
                                {recentFilms.length > 0 ? recentFilms.map((film) => (
                                    <tr key={film.id} className="hover:bg-[#222222]/20 transition-colors">
                                        <td className="py-3 text-xs font-semibold text-zinc-200">{film.judul}</td>
                                        <td className="py-3">
                                            <div className="flex flex-wrap gap-1">
                                                {(film.genres ? film.genres.map(g => g.nama) : ['Lainnya']).slice(0,2).map((g, idx) => (
                                                    <span key={idx} className="text-[9px] bg-purple-950/50 text-purple-400 border border-purple-900/30 px-2 py-0.5 rounded-full font-medium">{g}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 text-right text-xs font-medium">
                                            {/* Karena Edit butuh upload gambar, arahkan ke halaman aslinya */}
                                            <button onClick={() => navigate('/admin/film')} className="text-purple-400 hover:text-purple-300 hover:underline mr-2.5 transition">Edit</button>
                                            <button onClick={() => setFilmToDelete(film)} className="text-red-400/90 hover:text-red-400 hover:underline transition">Hapus</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="py-5 text-center text-xs text-zinc-500">Belum ada film terdaftar.</td>
                                    </tr>
                                )}
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
                                {recentUsers.length > 0 ? recentUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-[#222222]/20 transition-colors">
                                        <td className="py-3">
                                            <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                                                {u.name}
                                                {!u.is_active && <span className="text-[9px] bg-red-950/40 text-red-400 border border-red-900/30 px-1.5 py-0.5 rounded">Banned</span>}
                                            </div>
                                            <div className="text-[11px] text-zinc-500 font-medium">{u.email}</div>
                                        </td>
                                        <td className="py-3 text-xs font-medium text-zinc-400">{u.interacted_films_count || 0}</td>
                                        <td className="py-3 text-right text-xs font-medium">
                                            <button 
                                                onClick={() => setUserToToggle(u)} 
                                                className={`hover:underline transition ${!u.is_active ? 'text-emerald-400 hover:text-emerald-300' : 'text-red-400/90 hover:text-red-400'}`}
                                            >
                                                {!u.is_active ? 'Aktifkan' : 'Blokir'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="3" className="py-5 text-center text-xs text-zinc-500">Belum ada user terdaftar.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Hapus Film */}
            <ConfirmModal 
                isOpen={!!filmToDelete}
                title="Hapus Film?"
                message={`Apakah anda yakin ingin menghapus film "${filmToDelete?.judul}" secara permanen?`}
                confirmText="Ya, Hapus"
                onConfirm={handleConfirmDeleteFilm}
                onCancel={() => setFilmToDelete(null)}
            />

            {/* Modal Blokir / Aktifkan User */}
            <ConfirmModal 
                isOpen={!!userToToggle}
                title={userToToggle?.is_active ? 'Blokir User?' : 'Aktifkan User?'}
                message={`Apakah anda yakin untuk ${userToToggle?.is_active ? 'memblokir' : 'mengaktifkan kembali'} akun "${userToToggle?.name}"?`}
                confirmText={userToToggle?.is_active ? 'Blokir' : 'Aktifkan'}
                onConfirm={handleConfirmToggleUserStatus}
                onCancel={() => setUserToToggle(null)}
            />

        </>
    );
}