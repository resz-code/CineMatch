import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Home({ auth }) {
    const genres = ['Semua','Aksi','Drama','Sci-Fi','Komedi','Horor','Animasi'];
    const [activeGenre, setActiveGenre] = useState('Semua');

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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Beranda — CineMatch" />
            <div className="min-h-screen bg-gray-50">

                {/* Hero */}
                <div className="bg-white border-b border-gray-200 px-6 py-10 text-center">
                    <h2 className="text-2xl font-medium mb-2">Halo, {auth.user.name}! 👋</h2>
                    <p className="text-gray-500 text-sm mb-5">Temukan film yang pas untukmu hari ini</p>
                    <div className="flex gap-2 max-w-lg mx-auto">
                        <input
                            type="text"
                            placeholder="Cari judul film, genre, aktor..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                            Cari
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-8">

                    {/* Filter genre */}
                    <div className="flex gap-2 flex-wrap mb-8">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setActiveGenre(genre)}
                                className={`px-4 py-1.5 rounded-full border text-sm transition ${
                                    activeGenre === genre
                                        ? 'bg-purple-100 border-purple-300 text-purple-800'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-purple-300'
                                }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>

                    {/* Rekomendasi */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-900">Rekomendasi untukmu</h3>
                            <Link href="/jelajahi" className="text-sm text-purple-600 hover:underline">Lihat semua →</Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {dummyFilms.slice(0, 4).map((film) => (
                                <FilmCard key={film.id} film={film} />
                            ))}
                        </div>
                    </div>

                    {/* Populer */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-gray-900">Sedang populer</h3>
                            <Link href="/jelajahi" className="text-sm text-purple-600 hover:underline">Lihat semua →</Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {dummyFilms.slice(4, 8).map((film) => (
                                <FilmCard key={film.id} film={film} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function FilmCard({ film }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition cursor-pointer">
            <div className="h-36 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span className="text-purple-400 text-xs">Poster</span>
            </div>
            <div className="p-3">
                <p className="text-sm font-medium truncate mb-1">{film.judul}</p>
                <p className="text-xs text-gray-500 mb-2">{film.genre}</p>
                <div className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-500">★</span>
                    <span>{film.rating}</span>
                    {film.match && (
                        <span className="ml-auto bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                            {film.match}% cocok
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
