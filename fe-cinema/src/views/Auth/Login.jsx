import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../../api/axios';

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({email: '', password: '', remember: false});

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setStatus(null);

        try {
            // Memanggil API Login Laravel
            const response = await axios.post('/login', {
                email: data.email,
                password: data.password
            });

            // 1. Simpan Token dan Role ke Local Storage
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('role', response.data.user.role);

            setStatus("Login berhasil");

            // 2. Redirect berdasarkan Role
            setTimeout(() => {
                if (response.data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/home');
                }
            }, 500);

        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Error validasi form (seperti email kurang tepat/kosong)
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.data && error.response.data.message) {
                // Menangkap pesan error spesifik dari backend
                setErrors({
                    email: [error.response.data.message]
                });
            } else {
                setErrors({email: ["Terjadi kesalahan saat menghubungi server."]});
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#141414] flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-md">

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-medium text-white">
                        Cine<span className="text-purple-500">Match</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Sistem rekomendasi film personal</p>
                </div>

                <div className="bg-[#222222] rounded-xl border border-zinc-800 p-6 shadow-xl">

                    <div className="flex border border-zinc-700 rounded-lg overflow-hidden mb-5">
                        <button
                            type="button"
                            className="flex-1 py-2 text-sm font-medium bg-purple-600 text-white cursor-default">
                            Masuk
                        </button>
                        <Link
                            to="/register"
                            className="flex-1 py-2 text-sm font-medium text-center bg-[#222222] text-gray-400 hover:text-white transition">
                            Daftar
                        </Link>
                    </div>

                    {
                        status && (
                            <div
                                className="mb-4 text-sm text-green-400 bg-green-950/50 border border-green-900 px-3 py-2 rounded-lg">
                                {status}
                            </div>
                        )
                    }

                    <form onSubmit={submit}>
                        {/* Input Email */}
                        <div className="mb-4">
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData({
                                    ...data,
                                    email: e.target.value
                                })}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="nama@email.com"
                                required="required"/> {/* Menampilkan pesan error dari Laravel (biasanya array) */}
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
                        </div>

                        {/* Input Password */}
                        <div className="mb-4">
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
                                    className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="••••••••"
                                    required="required"/>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition focus:outline-none">
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
                                                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
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

                        <div className="flex items-center justify-between mb-5">
                            <label
                                className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData({
                                        ...data,
                                        remember: e.target.checked
                                    })}
                                    className="w-3 h-3 rounded bg-[#1a1a1a] border-zinc-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-[#222222]"/>
                                Ingat saya
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-white hover:text-gray-300 hover:underline transition">
                                Lupa password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center bg-purple-600 text-white h-10 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-70">
                            {
                                processing
                                    ? (
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <circle
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
                                        </svg>
                                    )
                                    : ('Masuk')
                            }
                        </button>
                    </form>

                    <p className="text-center text-xs text-zinc-500 mt-4">
                        Sistem mendeteksi role otomatis setelah login
                    </p>
                </div>
            </div>
        </div>
    );
}