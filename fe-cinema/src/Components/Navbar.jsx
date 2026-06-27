import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import ConfirmModal from './ConfirmModal'; // Pastikan path ini sesuai dengan lokasi ConfirmModal.jsx

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [user, setUser] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(true);
  
  // State baru untuk modal konfirmasi logout
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  // Mengambil data Dari database (Laravel) saat navbar dimuat
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user');
        setUser(response.data);
        localStorage.setItem('user_data', JSON.stringify(response.data));
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Melihat perubahan jika user mengubah nama di halaman profil
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('user_data');
      if (savedUser) setUser(JSON.parse(savedUser));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Menutup dropdown otomatis jika user klik di luar area profil
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fungsi logout
  const handleLogout = async () => {
    try {
      await axios.post('/logout'); 
    } catch (error) {
      console.error("Gagal logout:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_data');
      setIsLogoutConfirmOpen(false); // Tutup modal setelah proses
      navigate('/login');
    }
  };

  const getLinkClass = (path) => {
    const baseClass = "transition-colors font-medium text-sm tracking-wide";
    return location.pathname === path 
      ? `${baseClass} text-white` 
      : `${baseClass} text-zinc-400 hover:text-white`;
  };

  return (
    <>
      <nav className="bg-[#111111] border-b border-zinc-800 px-12 py-4 flex items-center justify-between sticky top-0 z-50">
        {/* Kiri: Logo & Teks CineMatch */}
        <div>
          <Link to="/home" className="flex items-center gap-2.5 text-purple-500 font-bold text-xl tracking-wide group">
            {/* Tag img untuk Logo.png */}
            <img 
                src="/Logo.png" 
                alt="Logo CineMatch" 
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110" 
            />
            CineMatch
          </Link>
        </div>

        {/* Kanan: Menu Navigasi & Tombol Profil Kotak Ungu */}
        <div className="flex items-center space-x-8">
          
          {/* Menu Navigasi Teks */}
          <div className="flex items-center space-x-6">
            <Link to="/home" className={getLinkClass('/home')}>Beranda</Link>
            <Link to="/jelajahi" className={getLinkClass('/jelajahi')}>Jelajahi</Link>
            <Link to="/riwayat" className={getLinkClass('/riwayat')}>Riwayat</Link>
          </div>

          <div className="relative flex items-center" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-purple-600 hover:bg-purple-700 text-white min-w-[80px] h-9 px-4 rounded-lg text-sm font-semibold tracking-wide transition-all focus:outline-none shadow-md shadow-purple-600/20 active:scale-95 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                  user.name
              )}
            </button>

            {/* Dropdown Menu Kecil */}
            {isDropdownOpen && !isLoading && (
              <div className="absolute right-0 top-full mt-3 w-48 bg-[#18181b] border border-zinc-800 rounded-lg shadow-2xl py-1 z-50 overflow-hidden">
                <button
                  onClick={() => { navigate('/dashboard'); setIsDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors block border-b border-zinc-800/50"
                >
                  Dashboard User
                </button>
                <button
                  onClick={() => { navigate('/profil'); setIsDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors block border-b border-zinc-800/50"
                >
                  Profil User
                </button>
                
                {/* Tombol Keluar memicu Modal, bukan langsung handleLogout */}
                <button
                  onClick={() => {
                      setIsLogoutConfirmOpen(true);
                      setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors block"
                >
                  Keluar
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Panggil komponen ConfirmModal di luar struktur utama Navbar */}
      <ConfirmModal 
          isOpen={isLogoutConfirmOpen}
          title="Konfirmasi Keluar"
          message="Apakah Anda yakin ingin keluar dari CineMatch? Anda harus login kembali untuk mengakses akun Anda."
          confirmText="Ya, Keluar"
          cancelText="Batal"
          onConfirm={handleLogout}
          onCancel={() => setIsLogoutConfirmOpen(false)}
      />
    </>
  );
}