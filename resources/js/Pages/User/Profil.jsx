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
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">

                            {/* Avatar */}
                            <div className="text-center mb-5">
                                <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-900/40 flex items-center justify-center text-2xl font-medium text-purple-400 mx-auto mb-3">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="font-medium text-sm text-white">{auth.user.name}</div>
                                <div className="text-xs text-zinc-500 mt-1">{auth.user.email}</div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-2 mb-5">
                                <div className="bg-[#222222] border border-zinc-800/60 rounded-lg p-2 text-center">
                                    <div className="font-medium text-base text-white">47</div>
                                    <div className="text-xs text-zinc-500">Ditonton</div>
                                </div>
                                <div className="bg-[#222222] border border-zinc-800/60 rounded-lg p-2 text-center">
                                    <div className="font-medium text-base text-white">32</div>
                                    <div className="text-xs text-zinc-500">Rating</div>
                                </div>
                            </div>

                            {/* Menu List */}
                            <div className="border-t border-zinc-800/60 pt-4">
                                {menus.map((menu) => (
                                    <button
                                        key={menu.id}
                                        onClick={() => setActiveMenu(menu.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium mb-1 transition active:scale-95 ${
                                            activeMenu === menu.id
                                                ? 'bg-purple-600 border border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                                : 'text-zinc-400 hover:bg-[#222222] hover:text-white'
                                        }`}
                                    >
                                        {menu.label}
                                    </button>
                                ))}

                                <div className="border-t border-zinc-800/60 mt-3 pt-3">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition active:scale-95"
                                    >
                                        Keluar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Konten utama */}
                    <div className="col-span-3">
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6">

                            {/* Edit profil */}
                            {activeMenu === 'edit' && (
                                <div>
                                    <h2 className="font-medium text-sm text-white mb-5">Edit profil</h2>
                                    <form onSubmit={submit}>
                                        <div className="grid grid-cols-2 gap-4 mb-5">
                                            <div>
                                                <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Nama lengkap</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition"
                                                />
                                                {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Email</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition"
                                                />
                                                {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 shadow-sm shadow-purple-600/20 active:scale-95"
                                            >
                                                {processing ? 'Menyimpan...' : 'Simpan perubahan'}
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 px-5 py-2 rounded-lg text-sm font-medium transition active:scale-95"
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
                                    <h2 className="font-medium text-sm text-white mb-1">Preferensi genre</h2>
                                    <p className="text-xs text-zinc-500 mb-5">Genre ini mempengaruhi hasil rekomendasi ML kamu</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {allGenres.map((genre) => (
                                            <button
                                                key={genre}
                                                type="button"
                                                onClick={() => toggleGenre(genre)}
                                                className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${
                                                    selectedGenres.includes(genre)
                                                        ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                                        : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                                                }`}
                                            >
                                                {genre}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="text-xs text-zinc-500">Dipilih:</span>
                                        <span className="text-xs font-medium text-purple-400">{selectedGenres.length} genre</span>
                                    </div>
                                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">
                                        Simpan preferensi
                                    </button>
                                </div>
                            )}

                            {/* Ubah password */}
                            {activeMenu === 'password' && (
                                <div>
                                    <h2 className="font-medium text-sm text-white mb-5">Ubah password</h2>
                                    <div className="mb-4 max-w-md">
                                        <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Password lama</label>
                                        <input type="password" className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" placeholder="••••••••" />
                                    </div>
                                    <div className="mb-4 max-w-md">
                                        <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Password baru</label>
                                        <input type="password" className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" placeholder="Min. 8 karakter" />
                                    </div>
                                    <div className="mb-6 max-w-md">
                                        <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Konfirmasi password baru</label>
                                        <input type="password" className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" placeholder="Ulangi password baru" />
                                    </div>
                                    <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">
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