import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // TODO: Hit API Laravel route('password.email')
        console.log("Kirim email reset ke:", email);
        setTimeout(() => setProcessing(false), 1000);
    };

    return (
        <div className="min-h-screen bg-[#141414] flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-medium text-white">
                        Cine<span className="text-purple-500">Match</span>
                    </h1>
                </div>

                <div className="bg-[#222222] rounded-xl border border-zinc-800 p-6 shadow-xl">
                    <h2 className="text-lg font-medium text-white mb-2">Lupa Password?</h2>
                    <div className="mb-5 text-sm text-gray-400 leading-relaxed">
                        Tidak masalah. Cukup masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang password Anda.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm text-green-400 bg-green-950/50 border border-green-900 px-3 py-2 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="nama@email.com"
                                required
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <Link to="/login" className="text-sm text-zinc-400 hover:text-white transition">
                                Kembali ke Login
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Kirim Tautan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}