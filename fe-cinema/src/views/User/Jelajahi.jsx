import { useState } from 'react';

export default function Jelajahi() {
    const [activeGenre, setActiveGenre] = useState('Semua');
    const [search, setSearch] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('rating');

    const genres = ['Semua','Aksi','Drama','Sci-Fi','Komedi','Horor','Animasi','Romansa','Fantasi','Misteri'];

    const dummyFilms = [
        { id: 1, judul: 'Interstellar', genre: 'Sci-Fi', rating: 4.8, match: 95 },
        { id: 2, judul: 'The Dark Knight', genre: 'Aksi', rating: 4.9, match: 92 },
        { id: 3, judul: 'Spirited Away', genre: 'Animasi', rating: 4.7, match: 88 },
        { id: 4, judul: 'Parasite', genre: 'Drama', rating: 4.6, match: 85 },
        { id: 5, judul: 'Inception', genre: 'Sci-Fi', rating: 4.8, match: 91 },
        { id: 6, judul: 'Oppenheimer', genre: 'Drama', rating: 4.7, match: 87 },
        { id: 7, judul: 'Dune Part Two', genre: 'Sci-Fi', rating: 4.5, match: 83 },
        { id: 8, judul: 'Past Lives', genre: 'Drama', rating: 4.4, match: 80 },
        { id: 9, judul: 'Arrival', genre: 'Sci-Fi', rating: 4.5, match: 96 },
        { id: 10, judul: 'Ex Machina', genre: 'Sci-Fi', rating: 4.3, match: 89 },
        { id: 11, judul: 'Gone Girl', genre: 'Misteri', rating: 4.4, match: 84 },
        { id: 12, judul: 'Poor Things', genre: 'Komedi', rating: 4.2, match: 78 },
    ];

    const filtered = dummyFilms.filter(f => {
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

    return (
        <div className="min-h-screen bg-[#141414] font-sans">
            
            {/* TODO: Navbar Component bisa diletakkan di sini */}

            {/* Section Input Pencarian */}
            <div className="border-b border-zinc-800/60 px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3 mb-5">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul film, genre, aktor..."
                            className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition"
                        />
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">
                            Cari
                        </button>
                    </div>

                    {/* Filter Kapsul Genre */}
                    <div className="flex gap-2 flex-wrap">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setActiveGenre(genre)}
                                className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${
                                    activeGenre === genre
                                        ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                        : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                                }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6">

                {/* Sidebar Filter */}
                <div className="w-full md:w-56 shrink-0">
                    <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 sticky top-6">
                        <div className="font-bold text-xs uppercase tracking-wider text-zinc-500 mb-4">Filter Panel</div>

                        {/* Range Slider Rating Minimum */}
                        <div className="mb-5">
                            <div className="text-[11px] text-zinc-400 uppercase font-medium mb-2">Rating minimum</div>
                            <input
                                type="range" min="0" max="5" step="0.5"
                                value={minRating}
                                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                className="w-full accent-purple-500 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-xs text-zinc-300 mt-2 font-medium">Min: {minRating} ★</div>
                        </div>

                        {/* Dropdown Urutan */}
                        <div className="mb-5">
                            <div className="text-[11px] text-zinc-400 uppercase font-medium mb-2">Urutkan</div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer transition"
                            >
                                <option value="rating">Rating tertinggi</option>
                                <option value="match">% Kecocokan</option>
                                <option value="judul">Judul A-Z</option>
                            </select>
                        </div>

                        {/* Tombol Reset Filter */}
                        <button
                            onClick={() => { setMinRating(0); setActiveGenre('Semua'); setSearch(''); setSortBy('rating'); }}
                            className="w-full bg-transparent border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 text-xs font-medium py-2 rounded-lg transition active:scale-95"
                        >
                            Reset filter
                        </button>
                    </div>
                </div>

                {/* Grid Hasil Film */}
                <div className="flex-1">
                    <div className="text-xs text-zinc-400 mb-4">
                        Menampilkan <span className="text-white font-medium">{filtered.length} film</span>
                        {activeGenre !== 'Semua' && (
                            <> · Kategori: <span className="text-purple-400 font-medium">{activeGenre}</span></>
                        )}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-24 text-zinc-500 border border-dashed border-zinc-800 rounded-xl bg-[#1a1a1a]/40">
                            <div className="text-4xl mb-3 select-none">🎬</div>
                            <div className="text-sm font-medium">Tidak ada film yang sesuai filter</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filtered.map((film) => (
                                <div 
                                    key={film.id} 
                                    className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition cursor-pointer p-3 flex flex-col justify-between shadow-lg group"
                                >
                                    {/* Poster Placeholder */}
                                    <div className="aspect-3/4 bg-[#262626] rounded-lg flex items-center justify-center mb-3 text-zinc-600 text-xs font-medium tracking-wider select-none transition group-hover:text-zinc-500">
                                        Poster film
                                    </div>
                                    
                                    {/* Info Detail Film */}
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
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}