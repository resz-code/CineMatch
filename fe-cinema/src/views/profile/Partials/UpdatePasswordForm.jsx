import { useState, useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const [data, setData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const updatePassword = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({}); // Reset pesan error sebelumnya

        // TODO: Integrasi dengan REST API Laravel (misal menggunakan axios.put('/api/user/password', data))
        console.log("Mengubah password:", data);

        // Simulasi proses API
        setTimeout(() => {
            setProcessing(false);
            
            // Simulasi jika berhasil
            setRecentlySuccessful(true);
            setData({ current_password: '', password: '', password_confirmation: '' }); // Reset form
            
            // Menghilangkan pesan "Tersimpan" setelah 2 detik
            setTimeout(() => setRecentlySuccessful(false), 2000);
            
            // Catatan: Jika gagal, setErrors dengan pesan dari API dan gunakan useRef untuk fokus ke input yang salah
            // contoh: currentPasswordInput.current?.focus();
        }, 1000);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Ubah Password
                </h2>

                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                    Pastikan akun Anda menggunakan password yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <label htmlFor="current_password" className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
                        Password Saat Ini
                    </label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData({ ...data, current_password: e.target.value })}
                        type="password"
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                        autoComplete="current-password"
                        required
                    />
                    {errors.current_password && (
                        <p className="text-red-400 text-xs mt-2">{errors.current_password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
                        Password Baru
                    </label>
                    <input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        type="password"
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                        autoComplete="new-password"
                        required
                    />
                    {errors.password && (
                        <p className="text-red-400 text-xs mt-2">{errors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
                        Konfirmasi Password
                    </label>
                    <input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                        type="password"
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                        autoComplete="new-password"
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-400 text-xs mt-2">{errors.password_confirmation}</p>
                    )}
                </div>

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