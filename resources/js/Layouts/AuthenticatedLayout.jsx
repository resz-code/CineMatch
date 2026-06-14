import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        /* KONTROL UTAMA BACKGROUND LUAR GELAP (#141414) UNTUK SEMUA HALAMAN */
        <div className="min-h-screen bg-[#141414] text-white transition-colors duration-200">

            {/* NAVBAR UTAMA - Menggunakan warna abu-abu gelap (#1a1a1a) */}
            <nav className="bg-[#1a1a1a] border-b border-zinc-800/80 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo CineMatch */}
                    <Link href="/home" className="text-lg font-medium text-white tracking-wide">
                        Cine<span className="text-purple-500">Match</span>
                    </Link>

                    {/* Nav Links Utama */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/home"
                            className={`text-sm font-medium transition duration-150 ${
                                route().current('home') ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/jelajahi"
                            className={`text-sm font-medium transition duration-150 ${
                                route().current('jelajahi') ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Jelajahi
                        </Link>
                        <Link
                            href="/riwayat"
                            className={`text-sm font-medium transition duration-150 ${
                                route().current('riwayat') ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Riwayat
                        </Link>

                        {/* Dropdown Profil */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 bg-purple-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-purple-700 transition active:scale-95"
                            >
                                {user.name}
                                <span className="text-xs transition-transform duration-200 block">▾</span>
                            </button>

                            {/* Menu Dropdown - Disesuaikan Tema Gelap */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-zinc-800 rounded-lg shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                    <Link
                                        href="/profil"
                                        className={`block px-4 py-2 text-sm transition ${
                                            route().current('profil') 
                                                ? 'bg-purple-600 text-white' 
                                                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profil saya
                                    </Link>
                                    <Link
                                        href="/dashboard-user"
                                        className={`block px-4 py-2 text-sm transition ${
                                            route().current('dashboard-user') 
                                                ? 'bg-purple-600 text-white' 
                                                : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                                        }`}
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    
                                    {/* Garis Pembatas Tipis */}
                                    <hr className="border-zinc-800 my-1"/>
                                    
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 font-medium transition"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Keluar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Opsional (Jika Halaman Mengirimkan Props Header) */}
            {header && (
                <header className="bg-[#1a1a1a] border-b border-zinc-800">
                    <div className="max-w-7xl mx-auto py-4 px-6 text-white text-lg font-medium">
                        {header}
                    </div>
                </header>
            )}

            {/* Slot Utama Konten Halaman (Beranda, Jelajahi, Riwayat, dll) */}
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}