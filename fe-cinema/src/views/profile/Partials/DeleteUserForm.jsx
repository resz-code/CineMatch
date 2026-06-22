import { useState, useRef } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const passwordInput = useRef(null);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
        // Memberi sedikit jeda agar modal ter-render sebelum focus dipanggil
        setTimeout(() => passwordInput.current?.focus(), 100);
    };

    const deleteUser = async (e) => {
        e.preventDefault();
        
        if (!password) {
            setError('Password harus diisi untuk mengonfirmasi penghapusan.');
            passwordInput.current?.focus();
            return;
        }

        setProcessing(true);
        setError('');

        // TODO: Hit API Delete Account (contoh: axios.delete('/api/user', { data: { password } }))
        console.log("Menghapus akun dengan password:", password);

        // Simulasi proses
        setTimeout(() => {
            setProcessing(false);
            closeModal();
            // TODO: Arahkan user ke halaman login setelah berhasil dihapus
            // window.location.href = '/login';
        }, 1500);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        setPassword('');
        setError('');
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Hapus Akun
                </h2>

                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                    Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus secara permanen. 
                    Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda simpan.
                </p>
            </header>

            <button
                type="button"
                onClick={confirmUserDeletion}
                className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition active:scale-95 shadow-sm shadow-red-600/20"
            >
                Hapus Akun
            </button>

            {/* Modal Pop-up Murni (Tanpa library eksternal) */}
            {confirmingUserDeletion && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a1a1a] border border-red-900/50 rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <form onSubmit={deleteUser}>
                            <h2 className="text-lg font-medium text-white mb-2">
                                Apakah Anda yakin ingin menghapus akun Anda?
                            </h2>

                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                Setelah akun Anda dihapus, semua sumber daya dan datanya akan dihapus 
                                secara permanen. Masukkan password Anda untuk mengonfirmasi bahwa 
                                Anda ingin menghapus akun ini secara permanen.
                            </p>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wider">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 transition"
                                    placeholder="Masukkan password Anda"
                                />
                                {error && (
                                    <p className="text-red-400 text-xs mt-2">{error}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-50 shadow-sm shadow-red-600/20 active:scale-95"
                                >
                                    {processing ? 'Menghapus...' : 'Hapus Akun'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}