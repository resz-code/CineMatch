import {useState, useEffect, useMemo} from 'react';
import axios from '../../api/axios';
import ConfirmModal from '../../Components/ConfirmModal';

export default function Riwayat() {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Semua');

    // State Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [hoverRating, setHoverRating] = useState(0);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // --- Mengambil data Dari backend ---
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get('/user/history');
                const formattedFilms = res
                    .data
                    .map(film => ({
                        id: film.id,
                        judul: film.judul,
                        tahun: film.tahun,
                        genre: film.genres && film.genres.length > 0
                            ? film
                                .genres
                                .map(g => g.nama)
                                .join(', ')
                            : 'Lainnya',
                        sinopsis: film.sinopsis,
                        poster: film.poster,
                        info: 'Sutradara • 2j 15m • PG-13',
                        match: Math.floor(Math.random() * (99 - 75 + 1)) + 75,
                        isWatched: film.pivot.is_watched == 1 || film.pivot.is_watched === true,
                        rating: film.pivot.rating || 0,
                        sudahRating: film.pivot.rating !== null && film.pivot.rating > 0,
                        tanggalUpdate: new Date(film.pivot.updated_at)
                    }));
                setFilms(formattedFilms);
            } catch (error) {
                console.error("Gagal mengambil riwayat:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // --- Mengelompokkan data berdasarkan bulan & tahun ---
    const riwayatData = useMemo(() => {
        const groups = {};
        const sortedFilms = [...films].sort(
            (a, b) => b.tanggalUpdate - a.tanggalUpdate
        );

        sortedFilms.forEach(film => {
            const monthYear = film
                .tanggalUpdate
                .toLocaleDateString('id-ID', {
                    month: 'long',
                    year: 'numeric'
                });
            if (!groups[monthYear]) {
                groups[monthYear] = [];
            }
            const tanggalSpesifik = film
                .tanggalUpdate
                .toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            groups[monthYear].push({
                ...film,
                tanggal: tanggalSpesifik
            });
        });
        return groups;
    }, [films]);

    // --- Menghitung statistik secara dinamis ---
    const stats = useMemo(() => {
        let totalWatched = 0;
        let totalRated = 0;
        let sumRating = 0;

        films.forEach(film => {
            if (film.isWatched) 
                totalWatched++;
            if (film.rating > 0) {
                totalRated++;
                sumRating += film.rating;
            }
        });

        return {
            total: totalWatched,
            sudahRating: totalRated,
            rataRating: totalRated > 0
                ? (sumRating / totalRated).toFixed(1)
                : "0.0"
        };
    }, [films]);

    // --- Handler fungsi API ---
    const handleSetRating = async (newRating) => {
        try {
            await axios.post(`/films/${selectedFilm.id}/rate`, {rating: newRating});
            const updatedFilms = films.map(
                f => f.id === selectedFilm.id
                    ? {
                        ...f,
                        rating: newRating,
                        sudahRating: true
                    }
                    : f
            );
            setFilms(updatedFilms);
            setSelectedFilm({
                ...selectedFilm,
                rating: newRating,
                sudahRating: true
            });
        } catch (error) {
            console.error("Gagal memberikan rating:", error);
        }
    };

    const handleTontonSekarang = async () => {
        try {
            window.open('https://www.tix.id/', '_blank');
            await axios.post(`/films/${selectedFilm.id}/watch`);
            const updatedFilms = films.map(
                f => f.id === selectedFilm.id
                    ? {
                        ...f,
                        isWatched: true
                    }
                    : f
            );
            setFilms(updatedFilms);
            setSelectedFilm({
                ...selectedFilm,
                isWatched: true
            });
        } catch (error) {
            console.error("Gagal mengupdate status tonton:", error);
        }
    };

    const confirmHapusRiwayat = async () => {
        try {
            await axios.post(`/films/${selectedFilm.id}/watch`);
            const updatedFilms = films.map(
                f => f.id === selectedFilm.id
                    ? {
                        ...f,
                        isWatched: false
                    }
                    : f
            );
            setFilms(updatedFilms);
            setSelectedFilm({
                ...selectedFilm,
                isWatched: false
            });
            setIsConfirmOpen(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Gagal menghapus riwayat:", error);
        }
    };

    const filters = ['Semua', 'Sudah dirating', 'Belum dirating'];

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-[#141414] flex flex-col items-center justify-center font-sans">
                <div
                    className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 text-sm animate-pulse tracking-wide">Memuat riwayat tontonan...</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#141414] font-sans relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl font-semibold tracking-wide text-white">Riwayat tontonan</h1>
                </div>

                {/* Panel Statistik */}
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
                        <div className="text-2xl font-bold text-amber-500 mb-0.5">★ {stats.rataRating}</div>
                        <div className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">Rata-rata rating</div>
                    </div>
                </div>

                {/* Kapsul Filter */}
                <div className="flex gap-2 flex-wrap mb-6">
                    {
                        filters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-4 py-1.5 rounded-full border text-xs font-medium transition active:scale-95 ${activeFilter === f
                                    ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-500/10'
                                    : 'bg-[#222222] border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-wh' +
                                            'ite'}`}>
                                {f}
                            </button>
                        ))
                    }
                </div>

                {/* Daftar Riwayat Film */}
                {
                    Object
                        .keys(riwayatData)
                        .length === 0
                            ? (
                                <div
                                    className="text-center py-20 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
                                    Belum ada riwayat tontonan. Coba tonton atau beri rating pada film di Beranda!
                                </div>
                            )
                            : (
                                <div className="space-y-6">
                                    {
                                        Object
                                            .entries(riwayatData)
                                            .map(([bulan, filmsDalamBulan]) => {
                                                const filtered = filmsDalamBulan.filter(f => {
                                                    if (activeFilter === 'Sudah dirating') 
                                                        return f.sudahRating;
                                                    if (activeFilter === 'Belum dirating') 
                                                        return !f.sudahRating;
                                                    return true;
                                                });

                                                if (filtered.length === 0) 
                                                    return null;
                                                
                                                return (
                                                    <div key={bulan}>
                                                        <div
                                                            className="text-[10px] font-bold text-zinc-500 tracking-widest mb-3 uppercase">{bulan}</div>
                                                        <div className="flex flex-col gap-3">
                                                            {
                                                                filtered.map((film) => (
                                                                    <div
                                                                        key={film.id}
                                                                        className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-700/80 transition group">
                                                                        <div className="flex items-center gap-4">
                                                                            <div
                                                                                className="w-10 h-14 bg-[#262626] border border-zinc-800 rounded flex items-center justify-center text-[9px] text-zinc-600 font-medium select-none text-center overflow-hidden">
                                                                                {
                                                                                    film.poster
                                                                                        ? <img
                                                                                                src={film.poster}
                                                                                                alt={film.judul}
                                                                                                className="w-full h-full object-cover object-top"/>
                                                                                        : 'Poster'
                                                                                }
                                                                            </div>
                                                                            <div>
                                                                                <div className="font-medium text-sm text-white mb-0.5">{film.judul}</div>
                                                                                <div
                                                                                    className="text-[11px] text-zinc-500 mb-2 truncate max-w-[200px] sm:max-w-md">{film.genre}
                                                                                    · {film.tahun}
                                                                                    · {film.tanggal}</div>
                                                                                <div className="flex items-center gap-2">
                                                                                    {
                                                                                        film.sudahRating && (
                                                                                            <div
                                                                                                className="flex text-[10px] text-amber-500 tracking-tighter bg-[#222222] border border-zinc-800 px-2 py-0.5 rounded">
                                                                                                {
                                                                                                    Array
                                                                                                        .from({length: 5})
                                                                                                        .map((_, idx) => (
                                                                                                            <span
                                                                                                                key={idx}
                                                                                                                className={idx < film.rating
                                                                                                                    ? 'text-amber-500'
                                                                                                                    : 'text-zinc-700'}>★</span>
                                                                                                        ))
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right flex flex-col justify-between h-14 py-0.5 shrink-0">
                                                                            <span
                                                                                className={`text-[11px] font-medium ${film.sudahRating
                                                                                    ? 'text-emerald-500'
                                                                                    : 'text-zinc-500'}`}>
                                                                                {
                                                                                    film.sudahRating
                                                                                        ? 'Sudah dirating'
                                                                                        : 'Belum dirating'
                                                                                }
                                                                            </span>
                                                                            <button
                                                                                onClick={() => {
                                                                                    setSelectedFilm(film);
                                                                                    setIsModalOpen(true);
                                                                                }}
                                                                                className={film.sudahRating
                                                                                    ? "text-[11px] text-purple-400 hover:text-purple-300 hover:underline transition"
                                                                                    : "bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-medium px-3 py-1" +
                                                                                            " rounded transition"}>
                                                                                {
                                                                                    film.sudahRating
                                                                                        ? 'Lihat detail →'
                                                                                        : 'Beri rating'
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    }
                                </div>
                            )
                }
            </div>

            {/* Modal detail film */}
            {
                isModalOpen && selectedFilm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div
                            className="bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 p-6 shadow-2xl relative transition-all duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition text-xs font-medium border border-zinc-700/50">← Kembali</button>
                            <div
                                className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mb-4 border-b border-zinc-800/80 pb-2 pr-20">Detail Informasi Film</div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                                <div className="flex flex-col gap-3">
                                    <div
                                        className="w-full h-auto bg-[#1a1a1a] border border-zinc-800 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
                                        {
                                            selectedFilm.poster
                                                ? <img
                                                        src={selectedFilm.poster}
                                                        alt={selectedFilm.judul}
                                                        className="w-full h-auto block object-contain"/>
                                                : <span className="py-20 text-zinc-600 text-xs font-medium">Poster film</span>
                                        }
                                    </div>

                                    {
                                        selectedFilm.isWatched
                                            ? (
                                                <button
                                                    onClick={() => setIsConfirmOpen(true)}
                                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg shadow-md shadow-emerald-600/10 active:scale-95 transition">
                                                    ✅ Sudah Ditonton
                                                </button>
                                            )
                                            : (
                                                <button
                                                    onClick={handleTontonSekarang}
                                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2.5 rounded-lg shadow-md shadow-purple-600/10 active:scale-95 transition">
                                                    🍿 Tonton Sekarang
                                                </button>
                                            )
                                    }

                                </div>
                                <div className="sm:col-span-2 flex flex-col gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white leading-tight">{selectedFilm.judul}
                                            <span className="text-sm font-normal text-zinc-500">({selectedFilm.tahun})</span>
                                        </h2>
                                        <p className="text-zinc-500 text-xs mt-1">{selectedFilm.info}</p>
                                    </div>

                                    <div className="flex gap-2 flex-wrap">
                                        {
                                            selectedFilm
                                                .genre
                                                .split(', ')
                                                .map(g => (
                                                    <span
                                                        key={g}
                                                        className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full border border-zinc-700">{g}</span>
                                                ))
                                        }
                                    </div>

                                    <div className="bg-[#121212] border border-zinc-800/80 rounded-xl p-4">
                                        <h4 className="text-[10px] font-semibold text-zinc-400 uppercase mb-1">Sinopsis</h4>
                                        <p className="text-xs text-zinc-400 leading-relaxed">{selectedFilm.sinopsis}</p>
                                    </div>
                                    <div className="bg-[#222222]/50 border border-zinc-800 rounded-xl p-3">
                                        <h4 className="text-xs font-semibold text-white">Beri Rating Film</h4>
                                        <div className="flex gap-1 mt-1">
                                            {
                                                [1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => handleSetRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none">
                                                        <span
                                                            className={(
                                                                star <= (hoverRating || selectedFilm.rating))
                                                                ? 'text-yellow-400'
                                                                : 'text-zinc-700'}>★</span>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Hapus dari Riwayat?"
                message={`Apakah Anda yakin ingin menghapus "${selectedFilm
                    ?.judul}" dari riwayat tontonan? Film akan hilang dari daftar ini.`}
                confirmText="Hapus"
                onConfirm={confirmHapusRiwayat}
                onCancel={() => setIsConfirmOpen(false)}/>

        </div>
    );
}