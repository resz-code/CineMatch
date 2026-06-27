import React, {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate, Outlet} from 'react-router-dom';
import axios from '../api/axios';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    // State untuk mengontrol munculnya pop-up log out
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Ambil data token dan role
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // --- Proteksi sederhana --- Karena kita tidak pakai AdminRoute, kita cegat di
    // sini saja
    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else if (role !== 'admin') {
            navigate('/home'); // Jika user biasa maksa masuk admin, Pindah ke home
        }
    }, [navigate, token, role]);

    // Fungsi pembantu untuk mendeteksi halaman mana yang aktif
    const getMenuClass = (path) => {
        const baseClass = "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transitio" +
                "n-colors block w-full text-left";
        return location
            .pathname
            .includes(path)
                ? `${baseClass} bg-zinc-800 text-white font-semibold`
                : `${baseClass} text-zinc-400 hover:bg-zinc-900 hover:text-white`;
    };

    // Fungsi Log Out
    const handleConfirmLogout = async () => {
        try {
            await axios.post('/logout');
        } catch (error) {
            console.error("Gagal logout dari server:", error);
        } finally {
            // Hapus data sesi di browser
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_data');

            setShowLogoutModal(false);
            navigate('/login');
        }
    };

    // Mencegah layar berkedip menampilkan UI admin sesaat sebelum ditendang
    if (role !== 'admin') {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-[#111111] text-white">

            {/* ─── Sidebar di sebelah kiri (selalu menempel) ─── */}
            <aside
                className="w-64 bg-[#161616] border-r border-zinc-800 p-6 shrink-0 sticky top-0 h-screen flex flex-col justify-between">
                <div>
                    {/* Logo Brand */}
                    <div className="mb-8">
                        <span
                            className="text-purple-500 font-bold text-xl tracking-wide flex items-center gap-2">
                            <img src="/Logo.png" alt="Logo" className="w-6 h-6 object-contain"/>
                            CineMatch
                        </span>
                        <p
                            className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-4">Admin Menu</p>
                    </div>

                    {/* Menu Navigasi Sidebar */}
                    <nav className="space-y-2">
                        <Link to="/admin/dashboard" className={getMenuClass('/admin/dashboard')}>
                            <span>📊</span>
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/admin/film" className={getMenuClass('/admin/film')}>
                            <span>🎬</span>
                            <span>Kelola film</span>
                        </Link>
                        <Link to="/admin/users" className={getMenuClass('/admin/users')}>
                            <span>👥</span>
                            <span>Kelola user</span>
                        </Link>
                        <Link to="/admin/model" className={getMenuClass('/admin/model')}>
                            <span>🤖</span>
                            <span>Model ML</span>
                        </Link>
                        <Link to="/admin/laporan" className={getMenuClass('/admin/laporan')}>
                            <span>📄</span>
                            <span>Laporan</span>
                        </Link>
                    </nav>
                </div>

                {/* Tombol Log Out di paling bawah sidebar */}
                <div className="pt-4 border-t border-zinc-800/60">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors">
                        <span>🚪</span>
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* ─── Konten dinamis di sebelah kanan ─── */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet/>
            </main>

            {/* ─── Modal confirm log out ─── */}
            {
                showLogoutModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                        <div
                            className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-sm rounded-xl p-6 text-center shadow-xl">
                            <div
                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/50 border border-red-900/30 text-red-400 text-xl mb-4">
                                🚪
                            </div>

                            <h3 className="text-base font-bold text-white mb-2">Log Out</h3>
                            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                                Apakah anda yakin ingin keluar dari akun admin?
                            </p>

                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowLogoutModal(false)}
                                    className="w-1/2 bg-zinc-850 border border-zinc-700/50 text-zinc-300 text-xs font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition">
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmLogout}
                                    className="w-1/2 bg-red-600 text-white text-xs font-medium py-2.5 rounded-lg hover:bg-red-500 transition shadow-sm">
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}