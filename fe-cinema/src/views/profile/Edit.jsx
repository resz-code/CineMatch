import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        /* Pembungkus layar penuh dengan background gelap CineMatch */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar Component di sini */}

            <div className="max-w-7xl mx-auto px-6 py-8">
                
                {/* Header Halaman */}
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-white">Pengaturan Akun</h1>
                    <p className="text-sm text-zinc-400 mt-1">Kelola informasi profil dan keamanan akun Anda</p>
                </div>

                <div className="space-y-6">
                    {/* Kotak Update Profile */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 p-6 rounded-xl shadow-sm">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Kotak Update Password */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 p-6 rounded-xl shadow-sm">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Kotak Delete User */}
                    <div className="bg-[#1a1a1a] border border-red-900/30 p-6 rounded-xl shadow-sm">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>

            </div>
        </div>
    );
}