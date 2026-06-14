export default function GuestLayout({ children }) {
    return (
        /* bg-gray-100 DIGANTI menjadi bg-[#121212] (Warna luar gelap pekat) */
        <div className="min-h-screen bg-[#121212] flex items-center justify-center py-10">
            <div className="w-full max-w-4xl px-6">
                {children}
            </div>
        </div>
    );
}