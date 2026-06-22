import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar'; 

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Tempat halaman konten dirender secara dinamis */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}