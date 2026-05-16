import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Jelajahi({ auth }) {
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
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Jelajahi — CineMatch" />

            {/* Search bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3 mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul film, genre, aktor..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                            Cari
                        </button>
                    </div>

                    {/* Filter genre */}
                    <div className="flex gap-2 flex-wrap">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setActiveGenre(genre)}
                                className={`px-3 py-1 rounded-full border text-sm transition ${
                                    activeGenre === genre
                                        ? 'bg-purple-100 border-purple-300 text-purple-800'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-purple-300'
                                }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">

                {/* Sidebar filter */}
                <div className="w-48 flex-shrink-0">
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="font-medium text-sm mb-4">Filter</div>

                        <div className="mb-4">
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Rating minimum</div>
                            <input
                                type="range" min="0" max="5" step="0.5"
                                value={minRating}
                                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                                className="w-full accent-purple-600"
                            />
                            <div className="text-xs text-gray-700 mt-1">Min: {minRating} ★</div>
                        </div>

                        <div className="mb-4">
                            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Urutkan</div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="rating">Rating tertinggi</option>
                                <option value="match">% Kecocokan</option>
                                <option value="judul">Judul A-Z</option>
                            </select>
                        </div>

                        <button
                            onClick={() => { setMinRating(0); setActiveGenre('Semua'); setSearch(''); }}
                            className="w-full border border-gray-200 text-gray-500 text-xs py-1.5 rounded-lg hover:bg-gray-50 transition"
                        >
                            Reset filter
                        </button>
                    </div>
                </div>

                {/* Grid film */}
                <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-4">
                        Menampilkan <strong>{filtered.length} film</strong>
                        {activeGenre !== 'Semua' && ` · Genre: ${activeGenre}`}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <div className="text-4xl mb-3">🎬</div>
                            <div className="text-sm">Tidak ada film yang sesuai filter</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {filtered.map((film) => (
                                <div key={film.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer">
                                    <div className="h-36 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                                        <span className="text-purple-400 text-xs">Poster</span>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-sm font-medium truncate mb-1">{film.judul}</p>
                                        <p className="text-xs text-gray-500 mb-2">{film.genre}</p>
                                        <div className="flex items-center gap-1 text-xs">
                                            <span className="text-yellow-500">★</span>
                                            <span>{film.rating}</span>
                                            <span className="ml-auto bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                                {film.match}% cocok
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
