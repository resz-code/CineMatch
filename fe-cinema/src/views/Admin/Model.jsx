export default function AdminModel() {
    return (
        /* Pembungkus layar penuh pengganti AdminLayout */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar/Sidebar Admin di sini */}

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-white">Model ML</h1>
                    <p className="text-sm text-zinc-400 mt-1">Kelola dan pantau performa model rekomendasi</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Panel Model Aktif */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                        <h2 className="font-medium text-sm text-zinc-300 mb-4">Model aktif</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center p-3 bg-purple-950/20 border border-purple-900/40 rounded-lg">
                                <div>
                                    <div className="text-sm font-semibold text-purple-300">Collaborative Filtering v2</div>
                                    <div className="text-xs text-purple-400/80 mt-0.5">Terakhir dilatih: 3 hari lalu</div>
                                </div>
                                <span className="text-xs bg-emerald-950/50 text-emerald-400 border border-emerald-900/30 px-2.5 py-0.5 rounded-full font-medium">Aktif</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-[#141414] border border-zinc-800 rounded-lg">
                                <div>
                                    <div className="text-sm font-medium text-zinc-400">Content-Based Filtering v1</div>
                                    <div className="text-xs text-zinc-500 mt-0.5">Terakhir dilatih: 2 minggu lalu</div>
                                </div>
                                <span className="text-xs bg-zinc-800 text-zinc-400 border border-zinc-700 px-2.5 py-0.5 rounded-full font-medium">Nonaktif</span>
                            </div>
                        </div>
                    </div>

                    {/* Panel Performa Model Evaluasi */}
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                        <h2 className="font-medium text-sm text-zinc-300 mb-4">Performa model</h2>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'Akurasi', value: '87.3%', pct: 87 },
                                { label: 'Precision', value: '84.1%', pct: 84 },
                                { label: 'Recall', value: '82.7%', pct: 83 },
                                { label: 'F1 Score', value: '83.4%', pct: 83 },
                            ].map((m) => (
                                <div key={m.label}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-zinc-400 font-medium">{m.label}</span>
                                        <span className="font-semibold text-white">{m.value}</span>
                                    </div>
                                    <div className="w-full bg-[#141414] rounded-full h-1.5 border border-zinc-800/50 overflow-hidden">
                                        <div className="bg-purple-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.3)]" style={{ width: `${m.pct}%` }}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Panel Retrain Model */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 shadow-sm">
                    <h2 className="font-medium text-sm text-zinc-300 mb-4">Retrain model</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                        <div className="bg-[#141414] border border-zinc-800/60 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white mb-1">4.891</div>
                            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total rating</div>
                        </div>
                        <div className="bg-[#141414] border border-zinc-800/60 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white mb-1">328</div>
                            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">User aktif</div>
                        </div>
                        <div className="bg-[#141414] border border-zinc-800/60 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-white mb-1">1.240</div>
                            <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total film</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => console.log("Mulai retrain model...")}
                            className="bg-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 active:scale-95 transition-all shadow-md shadow-purple-900/20"
                        >
                            🔄 Mulai retrain
                        </button>
                        <span className="text-xs text-zinc-500 font-medium bg-[#141414] px-3 py-1.5 rounded-lg border border-zinc-800/50">
                            Estimasi waktu: 5-10 menit
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}