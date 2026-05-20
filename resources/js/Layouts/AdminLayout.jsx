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
        <div className="min-h-screen bg-gray-50 flex">

            {/* Sidebar */}
            <div className="w-56 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
                {/* Logo */}
                <div className="px-5 py-4 border-b border-gray-200">
                    <div className="text-lg font-medium">
                        Cine<span className="text-purple-600">Match</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">Admin Panel</div>
                </div>

                {/* Menu */}
                <nav className="flex-1 px-3 py-4">
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3 px-2">Menu</div>
                    {menus.map((menu) => (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm mb-1 transition ${
                                window.location.pathname === menu.href
                                    ? 'bg-purple-50 text-purple-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <span>{menu.icon}</span>
                            {menu.label}
                        </Link>
                    ))}
                </nav>

                {/* User info */}
                <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-700">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">{user.name}</div>
                            <div className="text-xs text-gray-400">Admin</div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-xs text-red-400 hover:text-red-600"
                        >
                            Keluar
                        </Link>
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="flex-1 flex flex-col">
                {/* Top bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                        Admin
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
