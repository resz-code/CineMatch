import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../api/axios';

export default function Register() {
    const navigate = useNavigate();

    const [data, setData] = useState(
        {name: '', email: '', password: '', password_confirmation: '', genres: []}
    );

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const allGenres = [
        'Sci-Fi',
        'Drama',
        'Thriller',
        'Aksi',
        'Komedi',
        'Horor',
        'Animasi',
        'Romansa',
        'Dokumenter',
        'Fantasi',
        'Petualangan',
        'Misteri'
    ];

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const toggleGenre = (genre) => {
        const current = data.genres;
        if (current.includes(genre)) {
            setData({
                ...data,
                genres: current.filter(g => g !== genre)
            });
        } else {
            setData({
                ...data,
                genres: [
                    ...current,
                    genre
                ]
            });
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        if (data.genres.length < 3) {
            setErrors({genres: ['Pilih minimal 3 genre favorit.']});
            return;
        }

        setProcessing(true);
        setErrors({});

        try {
            const response = await axios.post('/register', data);

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.user.role);

            navigate('/home');

        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({email: ["Terjadi kesalahan saat mendaftar. Coba lagi nanti."]});
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#141414] flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-4xl">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-medium text-white">
                        Cine<span className="text-purple-500">Match</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Buat akun baru</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Kolom Kiri - Form */}
                    <div
                        className="bg-[#222222] rounded-xl border border-zinc-800 p-6 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex border border-zinc-700 rounded-lg overflow-hidden mb-5">
                                <Link
                                    to="/login"
                                    className="flex-1 py-2 text-sm font-medium text-center bg-[#222222] text-gray-400 hover:text-white transition">
                                    Masuk
                                </Link>
                                <button
                                    type="button"
                                    className="flex-1 py-2 text-sm font-medium bg-purple-600 text-white cursor-default">
                                    Daftar
                                </button>
                            </div>

                            <form onSubmit={submit} className="space-y-3">
                                {/* Input Nama Lengkap */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Nama lengkap</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData({
                                            ...data,
                                            name: e.target.value
                                        })}
                                        className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Nama kamu"
                                        required="required"/> {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
                                </div>

                                {/* Input Email */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData({
                                            ...data,
                                            email: e.target.value
                                        })}
                                        className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="nama@email.com"
                                        required="required"/> {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                                </div>

                                {/* Input Password */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword
                                                ? 'text'
                                                : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData({
                                                ...data,
                                                password: e.target.value
                                            })}
                                            className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Min. 8 karakter"
                                            required="required"/>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition">
                                            {
                                                showPassword
                                                    ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-5 h-5">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                                        </svg>
                                                    )
                                                    : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-5 h-5">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                        </svg>
                                                    )
                                            }
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password[0]}</p>}
                                </div>

                                {/* Input Konfirmasi Password */}
                                <div>
                                    <label className="block text-sm text-gray-300 mb-1">Konfirmasi password</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswordConfirmation
                                                ? 'text'
                                                : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData({
                                                ...data,
                                                password_confirmation: e.target.value
                                            })}
                                            className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            placeholder="Ulangi password"
                                            required="required"/>
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition">
                                            {
                                                showPasswordConfirmation
                                                    ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-5 h-5">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                                        </svg>
                                                    )
                                                    : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-5 h-5">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                                        </svg>
                                                    )
                                            }
                                        </button>
                                    </div>
                                </div>

                                {/* Tombol Submit dengan Animasi Loading */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 mt-2 flex items-center justify-center gap-2">
                                    {
                                        processing
                                            ? (
                                                <> < svg className = "animate-spin h-4 w-4 text-white" xmlns = "http://www.w3.org/2000/svg" fill = "none" viewBox = "0 0 24 24" > <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>Memproses ...</>
                                            )
                                            : ('Buat akun')
                                    }
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Kolom Kanan - Genre */}
                    <div
                        className="bg-[#222222] rounded-xl border border-zinc-800 p-6 shadow-xl flex flex-col justify-between">
                        <div>
                            <h2 className="text-sm font-medium text-white mb-1">Pilih genre favorit</h2>
                            <p className="text-xs text-zinc-400 mb-4">
                                Pilih minimal 3 genre agar rekomendasi lebih akurat
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {
                                    allGenres.map((genre) => (
                                        <button
                                            key={genre}
                                            type="button"
                                            onClick={() => toggleGenre(genre)}
                                            className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                                            data
                                                .genres
                                                .includes(genre)
                                                    ? 'bg-purple-600/20 border-purple-500 text-purple-400 shadow-sm shadow-purple-500' +
                                                            '/10'
                                                    : 'bg-[#1a1a1a] border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-wh' +
                                                            'ite'}`}>
                                            {genre}
                                        </button>
                                    ))
                                }
                            </div>
                            {errors.genres && <p className="text-red-400 text-xs mb-4">{errors.genres[0] || errors.genres}</p>}
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-zinc-400">Dipilih:</span>
                                <span className="text-xs font-semibold text-purple-400">
                                    {data.genres.length}
                                    genre
                                </span>
                                {
                                    data.genres.length < 3 && (
                                        <span className="text-xs text-amber-500 font-medium">
                                            (minimal 3)
                                        </span>
                                    )
                                }
                            </div>
                            <div
                                className="bg-purple-950/20 border-l-2 border-purple-500 rounded-r-lg px-3 py-2 text-xs text-zinc-400 leading-relaxed">
                                Genre ini digunakan untuk membangun profil preferensimu sejak pertama kali
                                masuk.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}