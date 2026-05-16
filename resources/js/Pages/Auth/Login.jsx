import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk — CineMatch" />

            <div className="text-center mb-6">
                <h1 className="text-3xl font-medium">
                    Cine<span className="text-purple-600">Match</span>
                </h1>
                <p className="text-gray-500 text-sm mt-1">Sistem rekomendasi film personal</p>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 p-6">

                {/* Toggle */}
                <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-5">
                    <button type="button" className="flex-1 py-2 text-sm font-medium bg-purple-600 text-white">
                        Masuk
                    </button>
                    <Link href={route('register')} className="flex-1 py-2 text-sm font-medium text-center bg-white text-gray-500">
                        Daftar
                    </Link>
                </div>

                {status && (
                    <div className="mb-4 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="nama@email.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="••••••••"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center justify-between mb-5">
                        <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-3 h-3"
                            />
                            Ingat saya
                        </label>
                        {canResetPassword && (
                            <Link href={route('password.request')} className="text-sm text-purple-600 hover:underline">
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                    Sistem mendeteksi role otomatis setelah login
                </p>
            </div>

        </GuestLayout>
    );
}
