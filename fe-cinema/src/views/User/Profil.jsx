import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
    const navigate = useNavigate();

    // 1. Simulasi data user yang sedang login
    const [user, setUser] = useState({
        name: 'Resz',
        email: 'Resz@cinematch.com'
    });

    const [activeMenu, setActiveMenu] = useState('edit');

    // 2. State untuk Form Edit Profil
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
    });
    const [processingEdit, setProcessingEdit] = useState(false);

    // 3. State untuk Preferensi Genre
    const allGenres = ['Sci-Fi','Drama','Thriller','Aksi','Komedi','Horor','Animasi','Romansa','Dokumenter','Fantasi','Petualangan','Misteri'];
    const [selectedGenres, setSelectedGenres] = useState(['Sci-Fi','Drama','Thriller']);

    // 4. State untuk Form Ubah Password
    const [passData, setPassData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [processingPass, setProcessingPass] = useState(false);

    // --- Fungsi-Fungsi Handler --- //

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const submitEdit = (e) => {
        e.preventDefault();
        setProcessingEdit(true);
        // TODO: Hit API Update Profile
        console.log("Update Data:", data);
        setTimeout(() => {
            setUser({ name: data.name, email: data.email }); // Update UI simulasi
            setProcessingEdit(false);
        }, 1000);
    };

    const submitPassword = (e) => {
        e.preventDefault();
        setProcessingPass(true);
        // TODO: Hit API Update Password
        console.log("Update Password:", passData);
        setTimeout(() => {
            setPassData({ old_password: '', new_password: '', confirm_password: '' });
            setProcessingPass(false);
        }, 1000);
    };

    const handleLogout = () => {
        // TODO: Hapus token dari LocalStorage/Cookies, lalu panggil API Logout
        console.log("Logout...");
        navigate('/login');
    };

    const menus = [
        { id: 'edit', label: 'Edit profil' },
        { id: 'genre', label: 'Preferensi genre' },
        { id: 'password', label: 'Ubah password' },
    ];

    return (
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar Component di sini */}

            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Sidebar Kiri */}
                    <div className="col-span-1">
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">

                            {/* Avatar */}
                            <div className="text-center mb-5">
                                <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-900/40 flex items-center justify-center text-2xl font-medium text-purple-400 mx-auto mb-3">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="font-medium text-sm text-white">{user.name}</div>
                                <div className="text-xs text-zinc-500 mt-1">{user.email}</div>
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

                    {/* Konten Utama Kanan */}
                    <div className="col-span-1 md:col-span-3">
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6">

                            {/* Panel: Edit profil */}
                            {activeMenu === 'edit' && (
                                <div>
                                    <h2 className="font-medium text-sm text-white mb-5">Edit profil</h2>
                                    <form onSubmit={submitEdit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                            <div>
                                                <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Nama lengkap</label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                    className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Email</label>
                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                    className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                type="submit"
                                                disabled={processingEdit}
                                                className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 shadow-sm shadow-purple-600/20 active:scale-95"
                                            >
                                                {processingEdit ? 'Menyimpan...' : 'Simpan perubahan'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Panel: Preferensi genre */}
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
                                    <button 
                                        onClick={() => console.log("Simpan Genre:", selectedGenres)}
                                        className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95"
                                    >
                                        Simpan preferensi
                                    </button>
                                </div>
                            )}

                            {/* Panel: Ubah password */}
                            {activeMenu === 'password' && (
                                <div>
                                    <h2 className="font-medium text-sm text-white mb-5">Ubah password</h2>
                                    <form onSubmit={submitPassword}>
                                        <div className="mb-4 max-w-md">
                                            <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Password lama</label>
                                            <input 
                                                type="password" 
                                                value={passData.old_password}
                                                onChange={(e) => setPassData({ ...passData, old_password: e.target.value })}
                                                className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                                placeholder="••••••••" 
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 max-w-md">
                                            <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Password baru</label>
                                            <input 
                                                type="password" 
                                                value={passData.new_password}
                                                onChange={(e) => setPassData({ ...passData, new_password: e.target.value })}
                                                className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                                placeholder="Min. 8 karakter" 
                                                required
                                            />
                                        </div>
                                        <div className="mb-6 max-w-md">
                                            <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Konfirmasi password baru</label>
                                            <input 
                                                type="password" 
                                                value={passData.confirm_password}
                                                onChange={(e) => setPassData({ ...passData, confirm_password: e.target.value })}
                                                className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                                placeholder="Ulangi password baru" 
                                                required
                                            />
                                        </div>
                                        <button 
                                            type="submit"
                                            disabled={processingPass}
                                            className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 shadow-sm shadow-purple-600/20 active:scale-95"
                                        >
                                            {processingPass ? 'Memproses...' : 'Ubah password'}
                                        </button>
                                    </form>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}