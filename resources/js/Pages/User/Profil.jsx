import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Profil({ auth }) {
    const [activeMenu, setActiveMenu] = useState('edit');

    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const allGenres = ['Sci-Fi','Drama','Thriller','Aksi','Komedi','Horor','Animasi','Romansa','Dokumenter','Fantasi','Petualangan','Misteri'];
    const [selectedGenres, setSelectedGenres] = useState(['Sci-Fi','Drama','Thriller']);

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const menus = [
        { id: 'edit', label: 'Edit profil' },
        { id: 'genre', label: 'Preferensi genre' },
        { id: 'password', label: 'Ubah password' },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profil — CineMatch" />

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-4 gap-6">

                    {/* Sidebar */}
                    <div className="col-span-1">
                        <div className="bg-white border border-gray-200 rounded-xl p-5">

                            {/* Avatar */}
                            <div className="text-center mb-5">
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl font-medium text-purple-700 mx-auto mb-3">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="font-medium text-sm">{auth.user.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{auth.user.email}</div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 mb-5">
                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                    <div className="font-medium text-base">47</div>
                                    <div className="text-xs text-gray-500">Ditonton</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                    <div className="font-medium text-base">32</div>
                                    <div className="text-xs text-gray-500">Rating</div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                {menus.map((menu) => (
                                    <button
                                        key={menu.id}
                                        onClick={() => setActiveMenu(menu.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${
                                            activeMenu === menu.id
                                                ? 'bg-white border border-gray-200 font-medium text-gray-900'
                                                : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {menu.label}
                                    </button>
                                ))}

                                <div className="border-t border-gray-100 mt-3 pt-3">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition"
                                    >
                                        Keluar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Konten utama */}
                    <div className="col-span-3">
                        <div className="bg-white border border-gray-200 rounded-xl p-6">

                            {/* Edit profil */}
                            {activeMenu === 'edit' && (
                                <div>
                                    <h2 className="font-medium text-base mb-5">Edit profil</h2>
                                    <form onSubmit={submit}>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Nama lengkap</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                />
                                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                                            >
                                                {processing ? 'Menyimpan...' : 'Simpan perubahan'}
                                            </button>
                                            <button
                                                type="button"
                                                className="border border-gray-200 text-gray-600 px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Preferensi genre */}
                            {activeMenu === 'genre' && (
                                <div>
                                    <h2 className="font-medium text-base mb-2">Preferensi genre</h2>
                                    <p className="text-xs text-gray-500 mb-5">Genre ini mempengaruhi hasil rekomendasi ML kamu</p>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {allGenres.map((genre) => (
                                            <button
                                                key={genre}
                                                onClick={() => toggleGenre(genre)}
                                                className={`px-3 py-1 rounded-full border text-sm transition ${
                                                    selectedGenres.includes(genre)
                                                        ? 'bg-purple-100 border-purple-300 text-purple-800'
                                                        : 'bg-white border-gray-200 text-gray-500 hover:border-purple-300'
                                                }`}
                                            >
                                                {genre}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="text-xs text-gray-500">Dipilih:</span>
                                        <span className="text-xs font-medium text-purple-600">{selectedGenres.length} genre</span>
                                    </div>
                                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                                        Simpan preferensi
                                    </button>
                                </div>
                            )}

                            {/* Ubah password */}
                            {activeMenu === 'password' && (
                                <div>
                                    <h2 className="font-medium text-base mb-5">Ubah password</h2>
                                    <div className="mb-4">
                                        <label className="block text-sm text-gray-600 mb-1">Password lama</label>
                                        <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="••••••••" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm text-gray-600 mb-1">Password baru</label>
                                        <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Min. 8 karakter" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm text-gray-600 mb-1">Konfirmasi password baru</label>
                                        <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Ulangi password baru" />
                                    </div>
                                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                                        Ubah password
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
