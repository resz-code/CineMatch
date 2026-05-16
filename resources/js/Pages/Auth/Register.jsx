import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        genres: [],
    });

    const allGenres = ['Sci-Fi','Drama','Thriller','Aksi','Komedi','Horor','Animasi','Romansa','Dokumenter','Fantasi','Petualangan','Misteri'];

    const toggleGenre = (genre) => {
        const current = data.genres;
        if (current.includes(genre)) {
            setData('genres', current.filter(g => g !== genre));
        } else {
            setData('genres', [...current, genre]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar — CineMatch" />

            <div className="text-center mb-6">
                <h1 className="text-3xl font-medium">
                    Cine<span className="text-purple-600">Match</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">Buat akun baru</p>
            </div>

            <div className="grid grid-cols-2 gap-4">

                {/* Kolom kiri - Form */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">

                    {/* Toggle */}
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-5">
                        <Link href={route('login')} className="flex-1 py-2 text-sm font-medium text-center bg-white text-gray-500">
                            Masuk
                        </Link>
                        <button type="button" className="flex-1 py-2 text-sm font-medium bg-purple-600 text-white">
                            Daftar
                        </button>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Nama lengkap</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Nama kamu"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="nama@email.com"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-1">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Min. 8 karakter"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm text-gray-600 mb-1">Konfirmasi password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Ulangi password"
                                required
                            />
                            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Memproses...' : 'Buat akun'}
                        </button>
                    </form>
                </div>

                {/* Kolom kanan - Pilih genre */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-sm font-medium mb-1">Pilih genre favorit</h2>
                    <p className="text-xs text-gray-500 mb-4">
                        Pilih minimal 3 genre agar rekomendasi lebih akurat
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {allGenres.map((genre) => (
                            <button
                                key={genre}
                                type="button"
                                onClick={() => toggleGenre(genre)}
                                className={`px-3 py-1 rounded-full border text-xs transition ${
                                    data.genres.includes(genre)
                                        ? 'bg-purple-100 border-purple-300 text-purple-800'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500">Dipilih:</span>
                        <span className="text-xs font-medium text-purple-600">
                            {data.genres.length} genre
                        </span>
                        {data.genres.length < 3 && (
                            <span className="text-xs text-amber-500">
                                (minimal 3)
                            </span>
                        )}
                    </div>

                    <div className="bg-gray-50 border-l-2 border-purple-400 rounded-r-lg px-3 py-2 text-xs text-gray-500">
                        Genre ini digunakan untuk membangun profil preferensimu sejak pertama kali masuk.
                    </div>
                </div>
            </div>

        </GuestLayout>
    );
}
