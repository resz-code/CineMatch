import { useState, useEffect } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail = false,
    status,
    className = '',
}) {
    // 1. Simulasi mengambil data user dari state management atau context
    const [user] = useState({
        name: 'Resz',
        email: 'Resz@cinematch.com',
        email_verified_at: null // Ubah ke true/tanggal jika sudah verifikasi
    });

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(status);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        // TODO: Integrasi dengan REST API Laravel (misal axios.patch('/api/user/profile', data))
        console.log("Menyimpan profil:", data);

        // Simulasi proses
        setTimeout(() => {
            setProcessing(false);
            setRecentlySuccessful(true);
            
            // Hilangkan pesan "Tersimpan" setelah 2 detik
            setTimeout(() => setRecentlySuccessful(false), 2000);
        }, 1000);
    };

    const resendVerification = async (e) => {
        e.preventDefault();
        // TODO: Panggil API kirim ulang email verifikasi
        console.log("Kirim ulang email verifikasi...");
        setVerificationStatus('verification-link-sent');
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Informasi Profil
                </h2>

                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                    Perbarui informasi profil dan alamat email akun Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
                        Nama Lengkap
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        required
                        autoComplete="name"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                        autoComplete="email"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
                </div>

                {/* Peringatan Verifikasi Email */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-950/30 border border-amber-900/50 p-4 rounded-lg">
                        <p className="text-sm text-amber-200">
                            Alamat email Anda belum diverifikasi.{' '}
                            <button
                                onClick={resendVerification}
                                className="font-medium underline hover:text-amber-100 transition focus:outline-none"
                            >
                                Klik di sini untuk mengirim ulang email verifikasi.
                            </button>
                        </p>

                        {verificationStatus === 'verification-link-sent' && (
                            <div className="mt-3 text-sm font-medium text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/30">
                                Tautan verifikasi baru telah dikirim ke alamat email Anda.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 shadow-sm shadow-purple-600/20 active:scale-95"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>

                    <p className={`text-sm text-emerald-400 transition-opacity duration-300 ${recentlySuccessful ? 'opacity-100' : 'opacity-0'}`}>
                        Tersimpan.
                    </p>
                </div>
            </form>
        </section>
    );
}