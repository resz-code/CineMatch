import { useState } from 'react';

export default function ConfirmPassword() {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // TODO: Hit API route('password.confirm')
        console.log("Konfirmasi Password:", password);
        setTimeout(() => setProcessing(false), 1000);
    };

    return (
        <div className="min-h-screen bg-[#141414] flex flex-col justify-center items-center p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="bg-[#222222] rounded-xl border border-zinc-800 p-6 shadow-xl">
                    <h2 className="text-lg font-medium text-white mb-2">Area Aman</h2>
                    <div className="mb-5 text-sm text-gray-400 leading-relaxed">
                        Ini adalah area aplikasi yang aman. Harap konfirmasi password Anda sebelum melanjutkan.
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                required
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-end mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Konfirmasi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}