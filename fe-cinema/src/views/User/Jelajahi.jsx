import { useState } from 'react';

export default function Jelajahi() {
    const [activeGenre, setActiveGenre] = useState('Semua');
    const [search, setSearch] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('rating');
    
    // State untuk Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const genres = ['Semua','Aksi','Drama','Sci-Fi','Komedi','Horor','Animasi','Romansa','Fantasi','Misteri'];

    const dummyFilms = [
        { id: 1, judul: 'Interstellar', tahun: '2014', info: 'Christopher Nolan • 2j 49m • PG-13', genre: 'Sci-Fi', rating: 4.8, match: 95, sinopsis: 'Ketika Bumi di masa depan tidak lagi mampu menopang kehidupan manusia akibat krisis pangan global, sekelompok astronot melakukan misi paling penting dalam sejarah manusia: menjelajahi lubang cacing di luar angkasa demi mencari planet baru yang layak huni.' },
        { id: 2, judul: 'The Dark Knight', tahun: '2008', info: 'Christopher Nolan • 2j 32m • PG-13', genre: 'Aksi', rating: 4.9, match: 92, sinopsis: 'Batman menghadapi ancaman terbesar Gotham City dari dalang kriminal sadis yang dikenal sebagai The Joker, yang berusaha menghancurkan tatanan moral kota.' },
        { id: 3, judul: 'Spirited Away', tahun: '2001', info: 'Hayao Miyazaki • 2j 5m • PG', genre: 'Animasi', rating: 4.7, match: 88, sinopsis: 'Seorang gadis kecil terjebak di dunia roh yang misterius dan harus mencari cara untuk kembali ke dunia manusia.' },
        { id: 4, judul: 'Parasite', tahun: '2019', info: 'Bong Joon-ho • 2j 12m • R', genre: 'Drama', rating: 4.6, match: 85, sinopsis: 'Keluarga miskin menyusup ke kehidupan keluarga kaya dengan bekerja sebagai staf rumah tangga.' },
        { id: 5, judul: 'Inception', tahun: '2010', info: 'Christopher Nolan • 2j 28m • PG-13', genre: 'Sci-Fi', rating: 4.8, match: 91, sinopsis: 'Seorang pencuri yang ahli masuk ke dalam mimpi orang lain untuk mencuri rahasia.' },
        { id: 6, judul: 'Oppenheimer', tahun: '2023', info: 'Christopher Nolan • 3j 0m • R', genre: 'Drama', rating: 4.7, match: 87, sinopsis: 'Kisah fisikawan J. Robert Oppenheimer dan perannya dalam pengembangan bom atom.' },
        { id: 7, judul: 'Dune Part Two', tahun: '2024', info: 'Denis Villeneuve • 2j 46m • PG-13', genre: 'Sci-Fi', rating: 4.5, match: 83, sinopsis: 'Paul Atreides bersatu dengan Chani dan Fremen saat ia menuntut balas dendam.' },
        { id: 8, judul: 'Past Lives', tahun: '2023', info: 'Celine Song • 1j 45m • PG-13', genre: 'Drama', rating: 4.4, match: 80, sinopsis: 'Dua teman masa kecil yang terpisah kembali dipertemukan setelah puluhan tahun.' },
        { id: 9, judul: 'Arrival', tahun: '2016', info: 'Denis Villeneuve • 1j 56m • PG-13', genre: 'Sci-Fi', rating: 4.5, match: 96, sinopsis: 'Seorang ahli bahasa mencoba berkomunikasi dengan makhluk luar angkasa.' },
        { id: 10, judul: 'Ex Machina', tahun: '2014', info: 'Alex Garland • 1j 48m • R', genre: 'Sci-Fi', rating: 4.3, match: 89, sinopsis: 'Seorang programmer muda dipilih untuk berpartisipasi dalam eksperimen AI.' },
        { id: 11, judul: 'Gone Girl', tahun: '2014', info: 'David Fincher • 2j 29m • R', genre: 'Misteri', rating: 4.4, match: 84, sinopsis: 'Hilangnya seorang istri secara misterius membuat suaminya menjadi tersangka utama.' },
        { id: 12, judul: 'Poor Things', tahun: '2023', info: 'Yorgos Lanthimos • 2j 21m • R', genre: 'Komedi', rating: 4.2, match: 78, sinopsis: 'Seorang wanita muda yang dibangkitkan kembali oleh ilmuwan mulai menjelajahi dunia.' },
    ];

    const handleOpenModal = (film) => {
        setSelectedFilm(film);
        setIsModalOpen(true);
        setUserRating(0);
    };

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
            <div className="border-b border-zinc-800/60 px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3 mb-5">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari judul film, genre, aktor..." className="flex-1 bg-[#1a1a1a] border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition" />
                        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">Cari</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {genres.map((genre) => (
                            <button key={genre} onClick={() => setActiveGenre(genre)} className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${activeGenre === genre ? 'bg-purple-600 border-purple-500 text-white' : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'}`}>
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
                        <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={(e) => setMinRating(parseFloat(e.target.value))} className="w-full accent-purple-500 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer mb-2" />
                        <div className="text-xs text-zinc-300 mb-5">Min: {minRating} ★</div>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-[#222222] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white mb-4">
                            <option value="rating">Rating tertinggi</option>
                            <option value="match">% Kecocokan</option>
                            <option value="judul">Judul A-Z</option>
                        </select>
                        <button onClick={() => { setMinRating(0); setActiveGenre('Semua'); }} className="w-full bg-transparent border border-zinc-800 text-zinc-400 text-xs py-2 rounded-lg hover:text-white">Reset filter</button>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map((film) => (
                            <div key={film.id} onClick={() => handleOpenModal(film)} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 cursor-pointer hover:border-zinc-600">
                                <div className="aspect-[3/4] bg-[#262626] rounded-lg mb-3 flex items-center justify-center text-zinc-600 text-xs">Poster film</div>
                                <p className="text-white font-medium text-sm">{film.judul}</p>
                                <p className="text-zinc-500 text-xs mb-2">{film.genre}</p>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-amber-500">★ {film.rating}</span>
                                    <span className="bg-purple-950/50 text-white px-2 py-0.5 rounded-full border border-purple-900">{film.match}% Match</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL POP-UP  */}
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
                                    <p className="text-[10px] text-zinc-500 mb-2">Beri bintang untuk melatih akurasi AI sistem rekomendasi</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} onClick={() => setUserRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="text-2xl">
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