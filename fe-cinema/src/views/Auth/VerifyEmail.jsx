import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState(null);

    const submitResend = async (e) => {
        e.preventDefault();
        setProcessing(true);
        // TODO: Hit API route('verification.send')
        setTimeout(() => {
            setProcessing(false);
            setStatus('verification-link-sent');
        }, 1000);
    };

    const handleLogout = () => {
        // TODO: Hit API Logout, hapus token, lalu redirect
        navigate('/login');
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
                    <h2 className="text-lg font-medium text-white mb-2">Verifikasi Email Anda</h2>
                    <div className="mb-4 text-sm text-gray-400 leading-relaxed">
                        Terima kasih telah mendaftar! Sebelum memulai, bisakah Anda memverifikasi alamat email dengan mengklik tautan yang baru saja kami kirimkan? Jika tidak menerima email tersebut, kami akan mengirimkan yang baru.
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-4 text-sm text-green-400 bg-green-950/50 border border-green-900 px-3 py-2 rounded-lg">
                            Tautan verifikasi baru telah dikirim ke alamat email Anda.
                        </div>
                    )}

                    <form onSubmit={submitResend}>
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Ulang Email'}
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full sm:w-auto text-sm text-zinc-400 hover:text-white transition underline"
                            >
                                Keluar Akun
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}