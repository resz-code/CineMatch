import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [activeTab, setActiveTab] = useState('login');

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk — CineMatch" />

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-8">
                <div className="w-full max-w-8xl">

                    {/* Logo */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-medium">
                            Cine<span className="text-purple-600">Match</span>
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Sistem rekomendasi film personal
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        {/* Kolom kiri - Form */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">

                            {/* Toggle Login / Register */}
                            <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-5">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('login')}
                                    className={`flex-1 py-2 text-sm font-medium transition ${
                                        activeTab === 'login'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white text-gray-500'
                                    }`}
                                >
                                    Masuk
                                </button>
                                <Link
                                    href={route('register')}
                                    onClick={() => setActiveTab('register')}
                                    className={`flex-1 py-2 text-sm font-medium text-center transition ${
                                        activeTab === 'register'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white text-gray-500'
                                    }`}
                                >
                                    Daftar
                                </Link>
                            </div>

                            {/* Pesan status */}
                            {status && (
                                <div className="mb-4 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                    {status}
                                </div>
                            )}

                            {/* Form login */}
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm text-gray-600 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mb-5">
                                    <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="w-3 h-3"
                                        />
                                        Ingat saya
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-purple-600 hover:underline"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Memproses...' : 'Masuk'}
                                </button>
                            </form>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                Sistem mendeteksi role otomatis setelah login
                            </p>
                        </div>

                        {/* Kolom kanan - Pilih genre */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-sm font-medium mb-1">
                                Pilih genre favorit
                            </h2>
                            <p className="text-xs text-gray-500 mb-4">
                                Pilih minimal 3 genre untuk rekomendasi yang akurat
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {['Sci-Fi', 'Drama', 'Thriller', 'Aksi', 'Komedi',
                                  'Horor', 'Animasi', 'Romansa', 'Dokumenter',
                                  'Fantasi', 'Petualangan', 'Misteri'].map((genre) => (
                                    <GenreChip key={genre} label={genre} />
                                ))}
                            </div>

                            <div className="bg-gray-50 border-l-2 border-purple-400 rounded-r-lg px-3 py-2 text-xs text-gray-500">
                                Genre ini digunakan untuk membangun preferensimu setelah pertama kali masuk.
                            </div>
                        </div>
                    </div>

                    {/* Keterangan role */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs">
                            <div className="font-medium text-purple-800 mb-1">Role: User</div>
                            <div className="text-gray-500">Diarahkan ke dashboard rekomendasi setelah login</div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-xs">
                            <div className="font-medium text-teal-800 mb-1">Role: Admin</div>
                            <div className="text-gray-500">Diarahkan ke admin panel secara otomatis</div>
                        </div>
                    </div>

                </div>
            </div>
        </GuestLayout>
    );
}

// Komponen chip genre
function GenreChip({ label }) {
    const [active, setActive] = useState(false);
    return (
        <button
            type="button"
            onClick={() => setActive(!active)}
            className={`px-3 py-1 rounded-full border text-xs transition ${
                active
                    ? 'bg-purple-100 border-purple-300 text-purple-800'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
        >
            {label}
        </button>
    );
}
