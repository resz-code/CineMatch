import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    // Simulasi data user (Nantinya data ini diambil dari API atau state management)
    const [user] = useState({ name: 'Pengguna' });

    const genres = ['Semua', 'Aksi', 'Drama', 'Sci-Fi', 'Komedi', 'Horor', 'Animasi'];

    const dummyFilms = [
        { id: 1, judul: 'Interstellar', genre: 'Sci-Fi', rating: 4.8, match: 95 },
        { id: 2, judul: 'The Dark Knight', genre: 'Aksi', rating: 4.9, match: 92 },
        { id: 3, judul: 'Spirited Away', genre: 'Animasi', rating: 4.7, match: 88 },
        { id: 4, judul: 'Parasite', genre: 'Drama', rating: 4.6, match: 85 },
        { id: 5, judul: 'Inception', genre: 'Sci-Fi', rating: 4.8, match: 91 },
        { id: 6, judul: 'Oppenheimer', genre: 'Drama', rating: 4.7, match: 87 },
        { id: 7, judul: 'Dune Part Two', genre: 'Sci-Fi', rating: 4.5, match: 83 },
        { id: 8, judul: 'Past Lives', genre: 'Drama', rating: 4.4, match: 80 },
    ];

    const [activeGenre, setActiveGenre] = useState('Semua');

    return (
        /* Pembungkus utama pengganti AuthenticatedLayout */
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar Component bisa diletakkan di sini */}

            {/* Hero section */}
            <div className="border-b border-zinc-800/60 px-6 py-10 text-center">
                <h2 className="text-2xl font-medium text-white mb-2">
                    Halo, <span className="text-purple-500">{user.name}</span>! 👋
                </h2>
                <p className="text-zinc-400 text-sm mb-5">
                    Temukan film yang pas untukmu hari ini
                </p>
                <form 
                    className="flex gap-2 max-w-lg mx-auto"
                    onSubmit={(e) => { e.preventDefault(); console.log("Mencari film..."); }}
                >
                    <input
                        type="text"
                        placeholder="Cari judul film, genre, aktor..."
                        className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition"
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95"
                    >
                        Cari
                    </button>
                </form>
            </div>

            {/* Container Konten Utama */}
            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Filter genre kapsul */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setActiveGenre(genre)}
                            className={`px-4 py-1.5 rounded-full border text-xs font-medium transition ${
                                activeGenre === genre
                                    ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                    : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                            }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>

                {/* Bagian: Rekomendasi untuk kamu */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white tracking-wide">Rekomendasi untukmu</h3>
                        <Link to="/jelajahi" className="text-xs text-purple-400 hover:underline transition">
                            Lihat semua →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {dummyFilms.slice(0, 4).map((film) => (
                            <FilmCard key={film.id} film={film} />
                        ))}
                    </div>
                </div>

                {/* Bagian: Sedang populer */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white tracking-wide">Sedang populer</h3>
                        <Link to="/jelajahi" className="text-xs text-purple-400 hover:underline transition">
                            Lihat semua →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {dummyFilms.slice(4, 8).map((film) => (
                            <FilmCard key={film.id} film={film} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// Komponen Card Film
function FilmCard({ film }) {
    return (
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition cursor-pointer p-3 flex flex-col justify-between shadow-lg group">
            {/* Poster placeholder */}
            <div className="aspect-3/4 bg-[#262626] rounded-lg flex items-center justify-center mb-3 text-zinc-600 text-xs font-medium tracking-wider select-none transition group-hover:text-zinc-500">
                Poster film
            </div>
            {/* Info detail film */}
            <div>
                <p className="text-sm font-medium text-white truncate mb-0.5 group-hover:text-purple-400 transition">{film.judul}</p>
                <p className="text-[11px] text-zinc-500 mb-2">{film.genre}</p>
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