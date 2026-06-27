import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import FilmDetailModal from '../../Components/FilmDetailModal'; // Memanggil komponen Modal

export default function Jelajahi() {
    const location = useLocation();
    
    // Menangkap kata kunci pencarian dari Home
    const initialSearch = location.state?.keyword || '';

    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeGenre, setActiveGenre] = useState('Semua');
    const [search, setSearch] = useState(initialSearch);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('rating');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);

    const genres = [
        'Semua', 'Aksi', 'Drama', 'Sci-Fi', 'Komedi', 
        'Horor', 'Animasi', 'Romansa', 'Fantasi', 'Misteri'
    ];

    // Mengambil data film dari API Laravel
    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const res = await axios.get('/films');
                
                // Format data agar sesuai dengan kebutuhan UI dan Multi-Genre
                const formattedFilms = res.data.map(film => ({
                    id: film.id,
                    judul: film.judul,
                    tahun: film.tahun,
                    info: 'Sutradara • 2j 15m • PG-13',
                    genre: film.genres && film.genres.length > 0 
                        ? film.genres.map(g => g.nama).join(', ') 
                        : 'Lainnya',
                    rating: film.rating_avg,
                    rating_default: film.rating_default || 0, 
                    my_rating: film.pivot?.rating || film.user_rating || 0,
                    match: Math.floor(Math.random() * (99 - 75 + 1)) + 75, 
                    sinopsis: film.sinopsis,
                    poster: film.poster
                }));

                setFilms(formattedFilms);
            } catch (error) {
                console.error("Gagal mengambil data film:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 800);
            }
        };

        fetchFilms();
    }, []);

    const handleOpenModal = (film) => {
        setSelectedFilm(film);
        setIsModalOpen(true);
    };

    // --- Fungsi interaksi ke backend ---

    const handleTontonSekarang = async () => {
        window.open('https://www.tix.id/', '_blank');
        
        if (selectedFilm) {
            try {
                await axios.post(`/films/${selectedFilm.id}/watch`);
                console.log('Tercatat di riwayat tontonan');
            } catch (error) {
                console.error("Gagal mencatat riwayat:", error);
            }
        }
    };

    const handleSetRating = async (star) => {
        if (selectedFilm) {
            try {
                await axios.post(`/films/${selectedFilm.id}/rate`, { rating: star });
                console.log(`Rating ${star} berhasil dikirim`);
            } catch (error) {
                console.error("Gagal menyimpan rating:", error);
            }
        }
    };

    // Logika penyaringan & pengurutan
    const filtered = films.filter(f => {
        const matchGenre = activeGenre === 'Semua' || f.genre.includes(activeGenre);
        const matchSearch = f.judul.toLowerCase().includes(search.toLowerCase());
        const matchRating = f.rating >= minRating;
        return matchGenre && matchSearch && matchRating;
    }).sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'match') return b.match - a.match;
        if (sortBy === 'judul') return a.judul.localeCompare(b.judul);
        return 0;
    });

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
            
            {/* Header / Search Bar */}
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

            {/* Konten Utama */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6">
                
                {/* Panel Kiri: Filter */}
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

                {/* Panel Kanan: Grid Film */}
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
                                    <p className="text-zinc-500 text-xs mb-2 truncate">{film.genre}</p>
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

            {/* Menggunakan komponen modal Yang sudah dipisah */}
            <FilmDetailModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                film={selectedFilm}
                onWatch={handleTontonSekarang}
                onRate={handleSetRating}
            />

        </div>
    );
}