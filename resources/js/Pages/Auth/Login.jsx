import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // State untuk kontrol visibilitas password (true = teks terlihat, false = disembunyikan)
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk — CineMatch" />

            {/* Bagian Judul */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-medium text-white">
                    Cine<span className="text-purple-500">Match</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">Sistem rekomendasi film personal</p>
            </div>

            {/* Kotak Form */}
            <div className="max-w-md mx-auto bg-[#222222] rounded-xl border border-zinc-800 p-6 shadow-xl">

                {/* Toggle Tombol Masuk / Daftar */}
                <div className="flex border border-zinc-700 rounded-lg overflow-hidden mb-5">
                    <button type="button" className="flex-1 py-2 text-sm font-medium bg-purple-600 text-white">
                        Masuk
                    </button>
                    <Link href={route('register')} className="flex-1 py-2 text-sm font-medium text-center bg-[#222222] text-gray-400 hover:text-white transition">
                        Daftar
                    </Link>
                </div>

                {status && (
                    <div className="mb-4 text-sm text-green-400 bg-green-950/50 border border-green-900 px-3 py-2 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    {/* Input Email */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="nama@email.com"
                            required
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Input Password */}
                    <div className="mb-4">
                        <label className="block text-sm text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="••••••••"
                                required
                            />
                            
                            {/* Tombol Mata Interaktif */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition focus:outline-none"
                            >
                                {showPassword ? (
                                    /* Ikon Mata Terbuka (Sembunyikan Password) */
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    /* Ikon Mata Tertutup (Tampilkan Password) */
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Checkbox & Lupa Password */}
                    <div className="flex items-center justify-between mb-5">
                        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-3 h-3 rounded bg-[#1a1a1a] border-zinc-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-[#222222]"
                            />
                            Ingat saya
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-sm text-white hover:text-gray-300 hover:underline transition">
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="text-center text-xs text-zinc-500 mt-4">
                    Sistem mendeteksi role otomatis setelah login
                </p>
            </div>
        </GuestLayout>
    );
}