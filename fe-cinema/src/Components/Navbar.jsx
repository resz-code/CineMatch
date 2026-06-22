import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios'; // Pastikan path import axios ini sesuai

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1. State awal diset titik-titik menunggu data asli dari database
  const [user, setUser] = useState({ name: '...' });

  // 2. Mengambil data user dari backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/user');
        setUser(response.data);
        // Simpan cadangan ke localStorage untuk sinkronisasi antar komponen
        localStorage.setItem('user_data', JSON.stringify(response.data));
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUser();
  }, []);

  // 3. Melihat Perubahan data user di local storage
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

  // 4. Fungsi logout 
  const handleLogout = async () => {
    try {
      await axios.post('/logout'); // Menghapus token di database Laravel
    } catch (error) {
      console.error("Gagal logout:", error);
    } finally {
      // Membersihkan semua jejak sesi di frontend
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user_data');
      
      navigate('/login');
    }
  };

  // Fungsi pembantu untuk menentukan
  const getLinkClass = (path) => {
    const baseClass = "transition-colors font-medium text-sm tracking-wide";
    return location.pathname === path 
      ? `${baseClass} text-white` 
      : `${baseClass} text-zinc-400 hover:text-white`;
  };

  return (
    <nav className="bg-[#111111] border-b border-zinc-800 px-12 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Kiri: Logo CineMatch */}
      <div>
        <Link to="/home" className="text-purple-500 font-bold text-xl tracking-wide">
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

        {/* Gabungan Profil: Menjadi Satu Tombol Kotak Ungu */}
        <div className="relative flex items-center" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all focus:outline-none shadow-md shadow-purple-600/20 active:scale-95"
          >
            {user.name}
          </button>

          {/* Dropdown Menu Kecil saat Kotak Ungu diklik */}
          {isDropdownOpen && (
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
              
              {/* TOMBOL LOGOUT BARU */}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors block"
              >
                Keluar
              </button>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}