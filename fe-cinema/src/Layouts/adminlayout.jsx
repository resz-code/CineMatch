import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State untuk mengontrol munculnya pop-up log out
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fungsi pembantu untuk mendeteksi halaman mana yang aktif agar warnanya berubah ungu/terang
  const getMenuClass = (path) => {
    const baseClass = "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors block w-full text-left";
    return location.pathname === path
      ? `${baseClass} bg-zinc-800 text-white font-semibold` // Gaya saat menu aktif
      : `${baseClass} text-zinc-400 hover:bg-zinc-900 hover:text-white`;
  };

  // Fungsi eksekusi Log Out setelah konfirmasi diklik
  const handleConfirmLogout = () => {
    // Jika nanti ada proses hapus token JWT atau localStorage, taruh di sini
    setShowLogoutModal(false);
    navigate('/login'); // Redirect kembali ke halaman login.jsx
  };

  return (
    <div className="flex min-h-screen bg-[#111111] text-white">
      
      {/* ─── SIDEBAR DI SEBELAH KIRI (SELALU MENEMPEL) ─── */}
      <aside className="w-64 bg-[#161616] border-r border-zinc-800 p-6 shrink-0 sticky top-0 h-screen flex flex-col justify-between">
        <div>
          {/* Logo Brand */}
          <div className="mb-8">
            <span className="text-purple-500 font-bold text-xl tracking-wide">CineMatch</span>
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-4">Admin Menu</p>
          </div>

          {/* Menu Navigasi Sidebar */}
          <nav className="space-y-2">
            <Link to="/admin/dashboard" className={getMenuClass('/admin/dashboard')}>
              <span>📊</span> <span>Dashboard</span>
            </Link>
            <Link to="/admin/film" className={getMenuClass('/admin/film')}>
              <span>🎬</span> <span>Kelola film</span>
            </Link>
            <Link to="/admin/users" className={getMenuClass('/admin/users')}>
              <span>👥</span> <span>Kelola user</span>
            </Link>
            <Link to="/admin/model" className={getMenuClass('/admin/model')}>
              <span>🤖</span> <span>Model ML</span>
            </Link>
            <Link to="/admin/laporan" className={getMenuClass('/admin/laporan')}>
              <span>📄</span> <span>Laporan</span>
            </Link>
          </nav>
        </div>

        {/* Tombol Log Out di paling bawah sidebar */}
        <div className="pt-4 border-t border-zinc-800/60">
          <button 
            onClick={() => setShowLogoutModal(true)} 
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
          >
            <span>🚪</span> <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ─── KONTEN DINAMIS DI SEBELAH KANAN ─── */}
      {/* Tag <Outlet /> ini berfungsi merender halaman /dashboard atau /film secara bergantian */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet /> 
      </main>

      {/* ─── MODAL CONFIRM LOG OUT ─── */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-sm rounded-xl p-6 text-center shadow-xl">
            {/* Ikon Pintu */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/50 border border-red-900/30 text-red-400 text-xl mb-4">
              🚪
            </div>
            
            {/* Teks Deskripsi */}
            <h3 className="text-base font-bold text-white mb-2">Log Out</h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              Apakah anda yakin ingin keluar dari akun admin?
            </p>
            
            {/* Tombol Pilihan */}
            <div className="flex justify-center gap-3">
              <button 
                type="button" 
                onClick={() => setShowLogoutModal(false)} 
                className="w-1/2 bg-zinc-850 border border-zinc-700/50 text-zinc-300 text-xs font-medium py-2.5 rounded-lg hover:bg-zinc-800 transition"
              >
                Batal
              </button>
              <button 
                type="button" 
                onClick={handleConfirmLogout} 
                className="w-1/2 bg-red-600 text-white text-xs font-medium py-2.5 rounded-lg hover:bg-red-500 transition shadow-sm"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}