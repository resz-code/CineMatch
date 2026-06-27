import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Mengambil token dan email dari parameter URL
    const [data, setData] = useState({
        token: searchParams.get('token') || '',
        email: searchParams.get('email') || '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // TODO: Hit API Laravel route('password.store')
        console.log("Data Reset Password:", data);
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
                    <h2 className="text-lg font-medium text-white mb-4">Buat Password Baru</h2>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-500 cursor-not-allowed focus:outline-none"
                                readOnly
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-300 mb-1">Password Baru</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-gray-300 mb-1">Konfirmasi Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Atur Ulang Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}