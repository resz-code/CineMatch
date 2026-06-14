import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menus = [
        { label: 'Dashboard', icon: '📊', href: '/admin' },
        { label: 'Kelola Film', icon: '🎬', href: '/admin/film' },
        { label: 'Kelola User', icon: '👥', href: '/admin/users' },
        { label: 'Model ML', icon: '🤖', href: '/admin/model' },
        { label: 'Laporan', icon: '📈', href: '/admin/laporan' },
    ];

    return (
        <div className="min-h-screen bg-[#121212] text-zinc-200 flex font-sans antialiased">

            {/* Sidebar — Diubah ke latar belakang hitam pekat */}
            <div className="w-56 bg-[#1a1a1a] border-r border-zinc-800 flex flex-col flex-shrink-0">
                
                {/* Logo & Sub-header Admin Panel */}
                <div className="px-5 py-4 border-b border-zinc-800">
                    <div className="text-lg font-bold text-white tracking-wide">
                        Cine<span className="text-[#a855f7]">Match</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-0.5">Admin Panel</div>
                </div>

                {/* Navigasi Menu Utama */}
                <nav className="flex-1 px-3 py-4">
                    <div className="text-[10px] text-zinc-600 font-semibold uppercase tracking-widest mb-3 px-2">Menu</div>
                    {menus.map((menu) => {
                        const isActive = window.location.pathname === menu.href;
                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs mb-1 transition-all duration-200 ${
                                    isActive
                                        ? 'bg-purple-950/40 text-purple-400 font-semibold border border-purple-900/40'
                                        : 'text-zinc-400 hover:bg-[#222222] hover:text-white'
                                }`}
                            >
                                <span className={`text-sm transition-transform duration-200 ${isActive ? 'scale-110' : 'opacity-80'}`}>
                                    {menu.icon}
                                </span>
                                {menu.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Informasi Identitas Akun User Admin (Bagian Bawah Sidebar) */}
                <div className="px-4 py-3 border-t border-zinc-800 bg-[#161616]">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-950/60 border border-purple-900/50 flex items-center justify-center text-xs font-bold text-purple-400 select-none flex-shrink-0">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-zinc-200 truncate">{user?.name || 'Admin'}</div>
                            <div className="text-[10px] text-zinc-500 font-medium">Administrator</div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-[11px] text-red-400/80 hover:text-red-400 font-medium transition px-1 py-0.5 rounded"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </div>

            {/* Area Konten Utama (Sebelah Kanan Sidebar) */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Top Navbar / Top Bar */}
                <div className="bg-[#1a1a1a] border-b border-zinc-800 px-6 py-3.5 flex items-center justify-between">
                    <div className="text-xs text-zinc-500 font-medium tracking-wide">
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-[10px] bg-purple-950/50 text-purple-300 border border-purple-900/40 px-3 py-1 rounded-full font-semibold tracking-wider uppercase">
                        Admin Root
                    </div>
                </div>

                {/* Wadah Render Komponen Halaman Konten */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}