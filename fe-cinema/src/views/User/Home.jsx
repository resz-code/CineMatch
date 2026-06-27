import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import FilmDetailModal from '../../Components/FilmDetailModal';

export default function Home() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: 'Pengguna' });
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const genres = ['Semua', 'Aksi', 'Drama', 'Sci-Fi', 'Komedi', 'Horor', 'Animasi'];
    const [activeGenre, setActiveGenre] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedFilm, setSelectedFilm] = useState(null);

    // Mengambil data dari Laravel
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const userRes = await axios.get('/user');
                setUser(userRes.data);

                const filmRes = await axios.get('/films');

                const formattedFilms = filmRes.data.map(film => ({
                    id: film.id,
                    judul: film.judul,
                    tahun: film.tahun,
                    genre: film.genres && film.genres.length > 0
                        ? film.genres.map(g => g.nama).join(', ')
                        : (film.genre ? film.genre.nama : 'Lainnya'),
                    rating: film.rating_avg,
                    rating_default: film.rating_default || 0, 
                    sinopsis: film.sinopsis,
                    poster: film.poster,
                    match: Math.floor(Math.random() * (99 - 75 + 1)) + 75,
                    info: 'Sutradara • 2j 15m • PG-13'
                }));

                setFilms(formattedFilms);
            } catch (error) {
                console.error("Gagal mengambil data dari server:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 800);
            }
        };

        fetchHomeData();
    }, []);

    const bukaDetailFilm = (film) => {
        setSelectedFilm(film);
        setIsModalOpen(true);
    };

    const handleTontonSekarang = async () => {
        window.open('https://www.tix.id/', '_blank');
        if (selectedFilm) { 
            try {
                await axios.post(`/films/${selectedFilm.id}/watch`);
                console.log('Film berhasil ditambahkan ke riwayat');
            } catch (error) {
                console.error("Gagal mencatat riwayat:", error);
            }
        }
    };

    const handleSetRating = async (star) => {
        if (selectedFilm) {
            try {
                await axios.post(`/films/${selectedFilm.id}/rate`, {rating: star});
                console.log(`Rating ${star} berhasil disimpan`);
            } catch (error) {
                console.error("Gagal menyimpan rating:", error);
            }
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/jelajahi', { state: { keyword: searchQuery } });
    };

    const filteredFilms = films.filter((film) => {
        if (activeGenre === 'Semua') return true;
        return film.genre.includes(activeGenre);
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center font-sans">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 text-sm animate-pulse tracking-wide">Menyiapkan rekomendasi untukmu...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] font-sans relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-none]">
            <div className="border-b border-zinc-800/60 px-6 py-10 text-center">
                <h2 className="text-2xl font-medium text-white mb-2">
                    Halo, <span className="text-purple-500">{user.name}</span>! 👋
                </h2>
                <p className="text-zinc-400 text-sm mb-5">Temukan film yang pas untukmu hari ini</p>
                <form className="flex gap-2 max-w-lg mx-auto" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari judul film, genre, aktor..."
                        className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition" />
                    <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">
                        Cari
                    </button>
                </form>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex gap-2 flex-wrap mb-8">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setActiveGenre(genre)}
                            className={`px-4 py-1.5 rounded-full border text-xs font-medium transition ${
                            activeGenre === genre
                                ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}>
                            {genre}
                        </button>
                    ))}
                </div>

                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white tracking-wide">Rekomendasi untukmu</h3>
                        <Link to="/jelajahi" className="text-xs text-purple-400 hover:underline transition">Lihat semua →</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredFilms.slice(0, 4).map((film) => (<FilmCard key={film.id} film={film} onClickCard={bukaDetailFilm}/>))}
                    </div>

                    {filteredFilms.slice(0, 4).length === 0 && (
                        <div className="text-center py-10 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
                            Belum ada rekomendasi untuk genre {activeGenre}
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white tracking-wide">Sedang populer</h3>
                        <Link to="/jelajahi" className="text-xs text-purple-400 hover:underline transition">Lihat semua →</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredFilms.slice(4, 8).map((film) => (<FilmCard key={film.id} film={film} onClickCard={bukaDetailFilm}/>))}
                    </div>

                    {filteredFilms.slice(4, 8).length === 0 && filteredFilms.length > 0 && (
                        <div className="text-center py-6 text-zinc-600 text-xs">
                            — Menampilkan semua film yang tersedia —
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

// Komponen Card Film
function FilmCard({film, onClickCard}) {
    return (
        <div onClick={() => onClickCard(film)} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition cursor-pointer p-3 flex flex-col justify-between shadow-lg group">
            <div className="aspect-3/4 bg-[#262626] rounded-lg flex items-center justify-center mb-3 text-zinc-600 text-xs font-medium tracking-wider select-none transition group-hover:text-zinc-500 overflow-hidden">
                {film.poster ? (
                    <img src={film.poster} alt={film.judul} className="w-full h-full object-cover object-top transition duration-300 group-hover:scale-105"/>
                ) : ("Poster film")}
            </div>
            <div>
                <p className="text-sm font-medium text-white truncate mb-0.5 group-hover:text-purple-400 transition">
                    {film.judul} <span className="text-xs font-normal text-zinc-500">({film.tahun})</span>
                </p>
                <p className="text-[11px] text-zinc-500 mb-2 truncate">{film.genre}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-0.5 text-xs">
                        <span className="text-amber-500">★</span>
                        <span className="text-zinc-300 font-medium">{film.rating}</span>
                    </div>
                    {film.match && (
                        <span className="text-[10px] font-semibold bg-purple-950/50 text-white px-2.5 py-0.5 rounded-full border border-purple-900/50 tracking-wide">
                            {film.match}% Match
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}