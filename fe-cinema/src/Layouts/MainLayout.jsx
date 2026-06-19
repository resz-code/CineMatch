import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Keluar folder layouts, masuk ke komponen

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Navbar otomatis ada di paling atas seluruh halaman user */}
      <Navbar />
      
      {/* Tempat halaman konten dirender secara dinamis */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}