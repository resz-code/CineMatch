import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/home" className="text-lg font-medium">
                        Cine<span className="text-purple-600">Match</span>
                    </Link>

                    {/* Nav links */}
                    <div className="flex items-center gap-6">
                        <Link
                            href="/home"
                            className={`text-sm ${route().current('home') ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/jelajahi"
                            className={`text-sm ${route().current('jelajahi') ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Jelajahi
                        </Link>
                        <Link
                            href="/riwayat"
                            className={`text-sm ${route().current('riwayat') ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            Riwayat
                        </Link>

                        {/* Dropdown profil */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 bg-purple-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-purple-700 transition"
                            >
                                {user.name}
                                <span className="text-xs">▾</span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profil saya
                                    </Link>
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <hr className="my-1"/>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
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

            {/* Header opsional */}
            {header && (
                <header className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto py-4 px-6">
                        {header}
                    </div>
                </header>
            )}

            {/* Konten halaman */}
            <main>{children}</main>
        </div>
    );
}
