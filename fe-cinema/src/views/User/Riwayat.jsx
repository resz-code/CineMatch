import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Riwayat() {
    const [activeFilter, setActiveFilter] = useState('Semua');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [hoverRating, setHoverRating] = useState(0);

    const [riwayatData, setRiwayatData] = useState({
        'April 2025': [
            { id: 1, judul: 'Arrival', genre: 'Sci-Fi', tahun: 2016, tanggal: '12 Apr 2025', rating: 5, sudahRating: true, info: 'Directed by Denis Villeneuve', sinopsis: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.', match: 98 },
            { id: 2, judul: 'Parasite', genre: 'Drama', tahun: 2019, tanggal: '8 Apr 2025', rating: 4, sudahRating: true, info: 'Directed by Bong Joon-ho', sinopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', match: 95 },
            { id: 3, judul: 'Poor Things', genre: 'Komedi', tahun: 2023, tanggal: '3 Apr 2025', rating: 0, sudahRating: false, info: 'Directed by Yorgos Lanthimos', sinopsis: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.', match: 92 },
        ],
        'Maret 2025': [
            { id: 4, judul: 'Interstellar', genre: 'Sci-Fi', tahun: 2014, tanggal: '28 Mar 2025', rating: 5, sudahRating: true, info: 'Directed by Christopher Nolan', sinopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.', match: 99 },
            { id: 5, judul: 'Oppenheimer', genre: 'Drama', tahun: 2023, tanggal: '20 Mar 2025', rating: 0, sudahRating: false, info: 'Directed by Christopher Nolan', sinopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', match: 94 },
        ],
    });

    const handleSetRating = (newRating) => {
        const updatedData = { ...riwayatData };
        Object.keys(updatedData).forEach(bulan => {
            updatedData[bulan] = updatedData[bulan].map(film => 
                film.id === selectedFilm.id 
                    ? { ...film, rating: newRating, sudahRating: true } 
                    : film
            );
        });
        setRiwayatData(updatedData);
        setSelectedFilm({ ...selectedFilm, rating: newRating, sudahRating: true });
    };

    const filters = ['Semua', 'Sudah dirating', 'Belum dirating', 'Di watchlist'];
    const stats = { total: 47, sudahRating: 32, rataRating: 4.2 };

    return (
        <div className="min-h-screen bg-[#141414] font-sans">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold tracking-wide text-white">Riwayat tontonan</h1>
                    <select className="bg-[#1a1a1a] border border-zinc-800 text-xs text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer transition">
                        <option>Semua waktu</option>
                        <option>Bulan ini</option>
                        <option>3 bulan terakhir</option>
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{stats.total}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Total ditonton</div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{stats.sudahRating}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Sudah dirating</div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-0.5">{stats.rataRating}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Rata-rata rating</div>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-6">
                    {filters.map((f) => (
                        <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${activeFilter === f ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10' : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {Object.entries(riwayatData).map(([bulan, films]) => {
                        const filtered = films.filter(f => {
                            if (activeFilter === 'Sudah dirating') return f.sudahRating;
                            if (activeFilter === 'Belum dirating') return !f.sudahRating;
                            return true;
                        });
                        if (filtered.length === 0) return null;
                        return (
                            <div key={bulan}>
                                <div className="text-[10px] font-bold text-zinc-500 tracking-widest mb-3 uppercase">{bulan}</div>
                                <div className="flex flex-col gap-3">
                                    {filtered.map((film) => (
                                        <div key={film.id} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-700/80 transition group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-14 bg-[#262626] border border-zinc-800 rounded flex items-center justify-center text-[9px] text-zinc-600 font-medium select-none text-center">Poster</div>
                                                <div>
                                                    <div className="font-medium text-sm text-white mb-0.5">{film.judul}</div>
                                                    <div className="text-[11px] text-zinc-500 mb-2">{film.genre} · {film.tahun} · {film.tanggal}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] bg-[#222222] border border-zinc-800 px-2 py-0.5 rounded text-purple-400 font-medium">{film.genre}</span>
                                                        {film.sudahRating && (
                                                            <div className="flex text-[10px] text-amber-500 tracking-tighter">
                                                                {Array.from({ length: 5 }).map((_, idx) => (
                                                                    <span key={idx} className={idx < film.rating ? 'text-amber-500' : 'text-zinc-700'}>★</span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col justify-between h-14 py-0.5 shrink-0">
                                                <span className={`text-[11px] font-medium ${film.sudahRating ? 'text-emerald-500' : 'text-zinc-500'}`}>
                                                    {film.sudahRating ? 'Sudah dirating' : 'Belum dirating'}
                                                </span>
                                                <button onClick={() => { setSelectedFilm(film); setIsModalOpen(true); }} className={film.sudahRating ? "text-[11px] text-purple-400 hover:text-purple-300 hover:underline transition" : "bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-medium px-3 py-1 rounded transition"}>
                                                    {film.sudahRating ? 'Lihat detail →' : 'Beri rating'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isModalOpen && selectedFilm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl border border-zinc-800 p-6 shadow-2xl relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800/60 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-700/50">← Kembali</button>
                        <div className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mb-4 border-b border-zinc-800/80 pb-2">Detail Informasi Film</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                            <div className="flex flex-col gap-3">
                                <div className="w-full aspect-[3/4] bg-[#262626] border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 text-xs">Poster film</div>
                                <button onClick={() => alert('Streaming simulation')} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2.5 rounded-lg shadow-md shadow-purple-600/10">🍿 Tonton Sekarang</button>
                            </div>
                            <div className="sm:col-span-2 flex flex-col gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white leading-tight">{selectedFilm.judul} <span className="text-sm font-normal text-zinc-500">({selectedFilm.tahun})</span></h2>
                                    <p className="text-zinc-500 text-xs mt-1">{selectedFilm.info}</p>
                                </div>
                                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full border border-zinc-700 w-max">{selectedFilm.genre}</span>
                                <div className="bg-[#121212] border border-zinc-800/80 rounded-xl p-4">
                                    <h4 className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Sinopsis</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">{selectedFilm.sinopsis}</p>
                                </div>
                                <div className="bg-[#222222]/50 border border-zinc-800 rounded-xl p-3">
                                    <h4 className="text-xs font-semibold text-white">Beri Rating Film</h4>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => handleSetRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="text-2xl transition">
                                                <span className={(star <= (hoverRating || selectedFilm.rating)) ? 'text-yellow-400' : 'text-zinc-700'}>★</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}