import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'; // Pastikan path ini sesuai

export default function Profil() {
    const navigate = useNavigate();

    // State untuk menyimpan data user asli dari database
    const [user, setUser] = useState({ name: 'Memuat...', email: 'memuat@cinematch.com' });
    const [isLoading, setIsLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState('edit');

    // State untuk Form Edit Profil
    const [data, setData] = useState({ name: '', email: '' });
    const [processingEdit, setProcessingEdit] = useState(false);
    const [editStatus, setEditStatus] = useState({ type: '', message: '' });

    // State untuk Preferensi Genre
    const allGenres = ['Sci-Fi','Drama','Thriller','Aksi','Komedi','Horor','Animasi','Romansa','Dokumenter','Fantasi','Petualangan','Misteri'];
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [processingGenre, setProcessingGenre] = useState(false);
    const [genreStatus, setGenreStatus] = useState({ type: '', message: '' });

    // State untuk Form Ubah Password
    const [passData, setPassData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [processingPass, setProcessingPass] = useState(false);
    const [passStatus, setPassStatus] = useState({ type: '', message: '' });

    // --- Mengambil Data User dari Laravel saat komponen dimuat --- //
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/user');
                const userData = response.data;
                
                setUser(userData);
                setData({ name: userData.name, email: userData.email });
                
                // Ekstrak nama genre dari array objek relasi bawaan Laravel
                if (userData.genres && userData.genres.length > 0) {
                    setSelectedGenres(userData.genres.map(g => g.nama));
                }
            } catch (error) {
                console.error("Gagal mengambil profil:", error);
                if (error.response?.status === 401) navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // --- Fungsi-Fungsi Handler --- //

    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    // 1. Handler Update Profil
    const submitEdit = async (e) => {
        e.preventDefault();
        setProcessingEdit(true);
        setEditStatus({ type: '', message: '' });

        try {
            // TODO di Backend: Buat API PUT /api/user/profile
            const response = await axios.put('/user/profile', data);
            
            setUser({ ...user, name: data.name, email: data.email });
            setEditStatus({ type: 'success', message: 'Profil berhasil diperbarui!' });

            // Update LocalStorage & Trigger Navbar agar langsung berubah
            localStorage.setItem('user_data', JSON.stringify({ ...user, name: data.name, email: data.email }));
            window.dispatchEvent(new Event('storage')); 

        } catch (error) {
            setEditStatus({ type: 'error', message: error.response?.data?.message || 'Gagal memperbarui profil.' });
        } finally {
            setProcessingEdit(false);
        }
    };

    // 2. Handler Update Genre
    const submitGenres = async () => {
        if (selectedGenres.length < 3) {
            setGenreStatus({ type: 'error', message: 'Pilih minimal 3 genre.' });
            return;
        }

        setProcessingGenre(true);
        setGenreStatus({ type: '', message: '' });

        try {
            // TODO di Backend: Buat API PUT /api/user/genres
            await axios.put('/user/genres', { genres: selectedGenres });
            setGenreStatus({ type: 'success', message: 'Preferensi genre berhasil disimpan!' });
        } catch (error) {
            setGenreStatus({ type: 'error', message: 'Gagal menyimpan preferensi genre.' });
        } finally {
            setProcessingGenre(false);
        }
    };

    // 3. Handler Update Password
    const submitPassword = async (e) => {
        e.preventDefault();
        setProcessingPass(true);
        setPassStatus({ type: '', message: '' });

        try {
            // TODO di Backend: Buat API PUT /api/user/password
            await axios.put('/user/password', passData);
            setPassStatus({ type: 'success', message: 'Password berhasil diubah!' });
            setPassData({ current_password: '', password: '', password_confirmation: '' });
        } catch (error) {
            setPassStatus({ type: 'error', message: error.response?.data?.message || 'Gagal mengubah password.' });
        } finally {
            setProcessingPass(false);
        }
    };

    // 4. Handler Logout
    const handleLogout = async () => {
        try {
            await axios.post('/logout');
        } catch (error) {
            console.error("Gagal logout:", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_data');
            navigate('/login');
        }
    };

    const menus = [
        { id: 'edit', label: 'Edit profil' },
        { id: 'genre', label: 'Preferensi genre' },
        { id: 'password', label: 'Ubah password' },
    ];

    if (isLoading) {
        return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-zinc-500">Memuat data profil...</div>;
    }

    return (
        <div className="min-h-screen bg-[#141414] font-sans">
            
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
                                        onClick={() => {
                                            setActiveMenu(menu.id);
                                            setEditStatus({type: '', message: ''});
                                            setGenreStatus({type: '', message: ''});
                                            setPassStatus({type: '', message: ''});
                                        }}
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
                                    
                                    {editStatus.message && (
                                        <div className={`mb-4 px-4 py-2 rounded-lg text-xs font-medium ${editStatus.type === 'success' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30' : 'bg-red-950/30 text-red-400 border border-red-900/30'}`}>
                                            {editStatus.message}
                                        </div>
                                    )}

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
                                    
                                    {genreStatus.message && (
                                        <div className={`mb-4 px-4 py-2 rounded-lg text-xs font-medium ${genreStatus.type === 'success' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30' : 'bg-amber-950/30 text-amber-400 border border-amber-900/30'}`}>
                                            {genreStatus.message}
                                        </div>
                                    )}

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
                                        onClick={submitGenres}
                                        disabled={processingGenre}
                                        className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 shadow-sm shadow-purple-600/20 active:scale-95"
                                    >
                                        {processingGenre ? 'Menyimpan...' : 'Simpan preferensi'}
                                    </button>
                                </div>
                            )}

                            {/* Panel: Ubah password */}
                            {activeMenu === 'password' && (
                                <div>
                                    <h2 className="font-medium text-sm text-white mb-5">Ubah password</h2>
                                    
                                    {passStatus.message && (
                                        <div className={`mb-4 max-w-md px-4 py-2 rounded-lg text-xs font-medium ${passStatus.type === 'success' ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30' : 'bg-red-950/30 text-red-400 border border-red-900/30'}`}>
                                            {passStatus.message}
                                        </div>
                                    )}

                                    <form onSubmit={submitPassword}>
                                        <div className="mb-4 max-w-md">
                                            <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Password lama</label>
                                            <input 
                                                type="password" 
                                                value={passData.current_password}
                                                onChange={(e) => setPassData({ ...passData, current_password: e.target.value })}
                                                className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                                placeholder="••••••••" 
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 max-w-md">
                                            <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Password baru</label>
                                            <input 
                                                type="password" 
                                                value={passData.password}
                                                onChange={(e) => setPassData({ ...passData, password: e.target.value })}
                                                className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition" 
                                                placeholder="Min. 8 karakter" 
                                                required
                                            />
                                        </div>
                                        <div className="mb-6 max-w-md">
                                            <label className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">Konfirmasi password baru</label>
                                            <input 
                                                type="password" 
                                                value={passData.password_confirmation}
                                                onChange={(e) => setPassData({ ...passData, password_confirmation: e.target.value })}
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