import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios'; 

export default function Jelajahi() {
    const location = useLocation();
    
    // Menangkap kata kunci pencarian dari Home (jika ada)
    const initialSearch = location.state?.keyword || '';

    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [activeGenre, setActiveGenre] = useState('Semua');
    const [search, setSearch] = useState(initialSearch); // Set state awal dari lemparan Home
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('rating');
    
    // State untuk Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const genres = ['Semua','Aksi','Drama','Sci-Fi','Komedi','Horor','Animasi','Romansa','Fantasi','Misteri'];

    // Mengambil data film dari API Laravel
    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const res = await axios.get('/films');
                
                // Format data agar sesuai dengan kebutuhan UI
                const formattedFilms = res.data.map(film => ({
                    id: film.id,
                    judul: film.judul,
                    tahun: film.tahun,
                    info: 'Sutradara • 2j 15m • PG-13',
                    genre: film.genre ? film.genre.nama : 'Lainnya',
                    rating: film.rating_avg,
                    match: Math.floor(Math.random() * (99 - 75 + 1)) + 75, 
                    sinopsis: film.sinopsis,
                    poster: film.poster
                }));

                setFilms(formattedFilms);
            } catch (error) {
                console.error("Gagal mengambil data film:", error);
            } finally {
                // Beri sedikit delay agar animasi loading natural
                setTimeout(() => setIsLoading(false), 800);
            }
        };

        fetchFilms();
    }, []);

    const handleOpenModal = (film) => {
        setSelectedFilm(film);
        setIsModalOpen(true);
        setUserRating(0);
    };

    // Logika penyaringan & pengurutan diterapkan pada state 'films'
    const filtered = films.filter(f => {
        const matchGenre = activeGenre === 'Semua' || f.genre === activeGenre;
        const matchSearch = f.judul.toLowerCase().includes(search.toLowerCase());
        const matchRating = f.rating >= minRating;
        return matchGenre && matchSearch && matchRating;
    }).sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'match') return b.match - a.match;
        if (sortBy === 'judul') return a.judul.localeCompare(b.judul);
        return 0;
    });

    // Jika sedang loading, tampilkan layar memuat
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center font-sans">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 text-sm animate-pulse tracking-wide">Memuat katalog film...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] font-sans relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
            <div className="border-b border-zinc-800/60 px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3 mb-5">
                        <input 
                            type="text" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            placeholder="Cari judul film, genre, aktor..." 
                            className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition" 
                        />
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">
                            Cari
                        </button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {genres.map((genre) => (
                            <button 
                                key={genre} 
                                onClick={() => setActiveGenre(genre)} 
                                className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${activeGenre === genre ? 'bg-purple-600 border-purple-500 text-white' : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-56 shrink-0">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 sticky top-6">
                        <div className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-4">Filter Panel</div>
                        <input 
                            type="range" min="0" max="5" step="0.5" 
                            value={minRating} 
                            onChange={(e) => setMinRating(parseFloat(e.target.value))} 
                            className="w-full accent-purple-500 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer mb-2" 
                        />
                        <div className="text-xs text-zinc-300 mb-5">Min: {minRating} ★</div>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)} 
                            className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white mb-4"
                        >
                            <option value="rating">Rating tertinggi</option>
                            <option value="match">% Kecocokan</option>
                            <option value="judul">Judul A-Z</option>
                        </select>
                        <button 
                            onClick={() => { setMinRating(0); setActiveGenre('Semua'); setSearch(''); setSortBy('rating'); }} 
                            className="w-full bg-transparent border border-zinc-800 text-zinc-400 text-xs py-2 rounded-lg hover:text-white hover:bg-zinc-800/50 transition"
                        >
                            Reset filter
                        </button>
                    </div>
                </div>

                <div className="flex-1">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
                            Tidak ada film yang cocok dengan filter pencarian.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filtered.map((film) => (
                                <div key={film.id} onClick={() => handleOpenModal(film)} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 cursor-pointer hover:border-zinc-600 transition group">
                                    <div className="aspect-3/4 bg-[#262626] rounded-lg mb-3 flex items-center justify-center text-zinc-600 text-xs overflow-hidden">
                                        {film.poster ? (
                                            <img src={film.poster} alt={film.judul} className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105" />
                                        ) : (
                                            "Poster film"
                                        )}
                                    </div>
                                    <p className="text-white font-medium text-sm truncate">{film.judul}</p>
                                    <p className="text-zinc-500 text-xs mb-2">{film.genre}</p>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-amber-500">★ {film.rating}</span>
                                        <span className="bg-purple-950/50 text-white px-2 py-0.5 rounded-full border border-purple-900">{film.match}% Match</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL POP-UP  */}
            {isModalOpen && selectedFilm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
                    <div className="bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 p-6 shadow-2xl relative transition-all duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition text-xs font-medium border border-zinc-700/50">← Kembali</button>
                        
                        <div className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mb-4 border-b border-zinc-800/80 pb-2 pr-20">Detail Informasi Film</div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                            <div className="flex flex-col gap-3">
                                <div className="w-full h-auto bg-[#1a1a1a] border border-zinc-800 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
                                    {selectedFilm.poster ? (
                                        <img src={selectedFilm.poster} alt={selectedFilm.judul} className="w-full h-auto block object-contain" />
                                    ) : (
                                        <span className="py-20 text-zinc-600 text-xs font-medium">Poster film</span>
                                    )}
                                </div>
                                <button onClick={() => window.open('https://www.tix.id/', '_blank')} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2.5 rounded-lg shadow-md shadow-purple-600/10 active:scale-95 transition">🍿 Tonton Sekarang</button>
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
                                    <p className="text-[10px] text-zinc-500 mb-2">Beri bintang untuk melatih akurasi AI sistem rekomendasi</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => setUserRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none">
                                                <span className={(star <= (hoverRating || userRating)) ? 'text-yellow-400' : 'text-zinc-700'}>★</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/60 mt-1">
                                    <span className="text-[10px] bg-purple-950/80 text-purple-400 border border-purple-900/40 px-2.5 py-0.5 rounded font-bold">{selectedFilm.match}% Match</span>
                                    <span className="text-zinc-500 text-[10px]">Sesuai dengan preferensi seleramu</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}