import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    // Simulasi data user
    const [user] = useState({ name: 'Tester' });

    const genres = ['Semua', 'Aksi', 'Drama', 'Sci-Fi', 'Komedi', 'Horor', 'Animasi'];

    const dummyFilms = [
        { id: 1, judul: 'Interstellar', tahun: '2014', genre: 'Sci-Fi', rating: 4.8, match: 95, sinopsis: 'Ketika Bumi di masa depan tidak lagi mampu menopang kehidupan manusia akibat krisis pangan global, sekelompok astronot melakukan misi paling penting dalam sejarah manusia: menjelajahi lubang cacing di luar angkasa demi mencari planet baru yang layak huni.', info: 'Christopher Nolan • 2j 49m • PG-13' },
        { id: 2, judul: 'The Dark Knight', tahun: '2008', genre: 'Aksi', rating: 4.9, match: 92, sinopsis: 'Batman menghadapi ancaman terbesar Gotham City dari dalang kriminal sadis yang dikenal sebagai The Joker, yang berusaha menghancurkan tatanan moral kota.', info: 'Christopher Nolan • 2j 32m • PG-13' },
        { id: 3, judul: 'Spirited Away', tahun: '2001', genre: 'Animasi', rating: 4.7, match: 88, sinopsis: 'Seorang gadis kecil berusia 10 tahun tersesat di dunia roh gaib dan magis. Setelah orang tuanya diubah menjadi babi, dia harus bekerja di pemandian roh untuk membebaskan mereka.', info: 'Hayao Miyazaki • 2j 5m • PG' },
        { id: 4, judul: 'Parasite', tahun: '2019', genre: 'Drama', rating: 4.6, match: 85, sinopsis: 'Kisah kesenjangan kelas sosial yang sengit antara keluarga miskin yang licik dan keluarga kaya yang naif, memicu serangkaian insiden tak terduga yang tragis.', info: 'Bong Joon Ho • 2j 12m • R' },
        { id: 5, judul: 'Inception', tahun: '2010', genre: 'Sci-Fi', rating: 4.8, match: 91, sinopsis: 'Seorang pencuri lihai yang mencuri rahasia berharga dari dalam alam bawah sadar mimpi manusia mendapatkan kesempatan terakhir untuk membersihkan namanya dengan melakukan tugas sebaliknya: menanamkan ide.', info: 'Christopher Nolan • 2j 28m • PG-13' },
        { id: 6, judul: 'Oppenheimer', tahun: '2023', genre: 'Drama', rating: 4.7, match: 87, sinopsis: 'Kisah epik tentang fisikawan teoretis J. Robert Oppenheimer yang memimpin Proyek Manhattan dalam menciptakan bom atom pertama di dunia demi mengakhiri Perang Dunia II.', info: 'Christopher Nolan • 3j 0m • R' },
        { id: 7, judul: 'Dune Part Two', tahun: '2024', genre: 'Sci-Fi', rating: 4.5, match: 83, sinopsis: 'Paul Atreides bersatu kembali dengan Chani dan suku Fremen untuk membalas dendam terhadap para konspirator yang menghancurkan keluarganya, berjuang mencegah masa depan mengerikan.', info: 'Denis Villeneuve • 2j 46m • PG-13' },
        { id: 8, judul: 'Past Lives', tahun: '2023', genre: 'Drama', rating: 4.4, match: 80, sinopsis: 'Dua teman masa kecil yang terpisah dalam waktu lama terhubung kembali selama satu minggu di New York, di mana mereka menghadapi takdir, cinta, dan pilihan hidup mereka.', info: 'Celine Song • 1j 45m • PG-13' },
    ];

    const [activeGenre, setActiveGenre] = useState('Semua');

    // State untuk kontrol Modal Pop-up Detail Film
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Fungsi untuk membuka pop-up dan mengirim data film
    const bukaDetailFilm = (film) => {
        setSelectedFilm(film);
        setIsModalOpen(true);
        setUserRating(0); // Reset bintang setiap kali membuka film baru
    };

    // Jalankan logika penyaringan (filtering) berdasarkan genre aktif
    const filteredFilms = dummyFilms.filter((film) => 
        activeGenre === 'Semua' ? true : film.genre === activeGenre
    );

    return (
        <div className="min-h-screen bg-[#141414] font-sans relative">
            
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
                        {filteredFilms.slice(0, 4).map((film) => (
                            <FilmCard key={film.id} film={film} onClickCard={bukaDetailFilm} />
                        ))}
                    </div>

                    {/* Pesan kosong jika filter tidak menghasilkan data di baris pertama */}
                    {filteredFilms.slice(0, 4).length === 0 && (
                        <div className="text-center py-10 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
                            Belum ada rekomendasi untuk genre {activeGenre}
                        </div>
                    )}
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
                        {filteredFilms.slice(4, 8).map((film) => (
                            <FilmCard key={film.id} film={film} onClickCard={bukaDetailFilm} />
                        ))}
                    </div>

                    {/* Pesan kosong jika tidak ada film untuk baris kedua */}
                    {filteredFilms.slice(4, 8).length === 0 && filteredFilms.length > 0 && (
                        <div className="text-center py-6 text-zinc-600 text-xs">
                            — Menampilkan semua film yang tersedia —
                        </div>
                    )}
                </div>

            </div>

            {/* --- LAYAR LAYALANG / POP-UP MODAL DETAIL FILM --- */}
            {isModalOpen && selectedFilm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
                    
                    {/* Kotak Utama Pop-Up */}
                    <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl border border-zinc-800 p-6 shadow-2xl relative transition-all duration-300">
                        
                        {/* Tombol Kembali (Menggantikan Tombol Silang X) */}
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition text-xs font-medium border border-zinc-700/50"
                        >
                            ← Kembali
                        </button>

                        {/* Label Atas */}
                        <div className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mb-4 border-b border-zinc-800/80 pb-2">
                            Detail Informasi Film
                        </div>

                        {/* Grid Konten: Kiri (Poster & Gimmick), Kanan (Informasi) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                            
                            {/* KOLOM KIRI */}
                            <div className="flex flex-col gap-3">
                                <div className="w-full aspect-[3/4] bg-[#262626] border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 text-xs font-medium select-none shadow-inner">
                                    Poster film
                                </div>
                                
                                {/* Tombol Gimmick Tonton Sekarang */}
                                <button 
                                    onClick={() => alert('Fitur streaming film belum tersedia. Ini hanya simulasi tampilan!')}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2.5 rounded-lg transition active:scale-95 shadow-md shadow-purple-600/10"
                                >
                                    🍿 Tonton Sekarang
                                </button>
                            </div>

                            {/* KOLOM KANAN */}
                            <div className="sm:col-span-2 flex flex-col gap-4">
                                <div>
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        <h2 className="text-2xl font-bold text-white leading-tight">{selectedFilm.judul}</h2>
                                        <span className="text-sm font-normal text-zinc-500">({selectedFilm.tahun})</span>
                                    </div>
                                    <p className="text-zinc-500 text-xs mt-1">{selectedFilm.info}</p>
                                </div>

                                {/* Genre Badge */}
                                <div className="flex gap-2">
                                    <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full border border-zinc-700">
                                        {selectedFilm.genre}
                                    </span>
                                </div>

                                {/* Deskripsi / Sinopsis */}
                                <div className="bg-[#121212] border border-zinc-800/80 rounded-xl p-4">
                                    <h4 className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Sinopsis</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed">{selectedFilm.sinopsis}</p>
                                </div>

                                {/* Area Sistem Rating Bintang Interaktif */}
                                <div className="bg-[#222222]/50 border border-zinc-800 rounded-xl p-3 flex flex-col gap-1.5">
                                    <div>
                                        <h4 className="text-xs font-semibold text-white">Beri Rating Film</h4>
                                        <p className="text-[10px] text-zinc-500">Beri bintang untuk melatih akurasi AI sistem rekomendasi</p>
                                    </div>
                                    
                                    {/* Tombol Interaksi Bintang */}
                                    <div className="flex items-center gap-1 mt-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none"
                                                onClick={() => setUserRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                            >
                                                <span className={(star <= (hoverRating || userRating)) ? 'text-yellow-400' : 'text-zinc-700'}>
                                                    ★
                                                </span>
                                            </button>
                                        ))}
                                        
                                        {userRating > 0 && (
                                            <span className="text-[10px] font-medium text-emerald-400 ml-2 animate-pulse">
                                                Kamu memilih ★ {userRating}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Persentase Kecocokan Sistem */}
                                <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/60 mt-1">
                                    <span className="text-[10px] bg-purple-950/80 text-purple-400 border border-purple-900/40 px-2.5 py-0.5 rounded font-bold">
                                        {selectedFilm.match}% Match
                                    </span>
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

// Komponen Card Film (Menerima props onClickCard)
function FilmCard({ film, onClickCard }) {
    return (
        <div 
            onClick={() => onClickCard(film)}
            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition cursor-pointer p-3 flex flex-col justify-between shadow-lg group"
        >
            {/* Poster placeholder */}
            <div className="aspect-3/4 bg-[#262626] rounded-lg flex items-center justify-center mb-3 text-zinc-600 text-xs font-medium tracking-wider select-none transition group-hover:text-zinc-500">
                Poster film
            </div>
            {/* Info detail film */}
            <div>
                <p className="text-sm font-medium text-white truncate mb-0.5 group-hover:text-purple-400 transition">
                    {film.judul} <span className="text-xs font-normal text-zinc-500">({film.tahun})</span>
                </p>
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