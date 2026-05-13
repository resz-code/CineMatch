export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="w-full max-w-4xl px-6">
                {children}
            </div>
        </div>
    );
}