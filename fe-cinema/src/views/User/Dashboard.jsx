import {useState, useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';
import axios from '../../api/axios';

export default function Dashboard() {
    const [user, setUser] = useState({name: '...'});
    const [history, setHistory] = useState([]);
    const [allFilms, setAllFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Mengambil semua data dari backend ---
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Memanggil API
                const [userRes, historyRes, filmsRes] = await Promise.all(
                    [axios.get('/user'), axios.get('/user/history'), axios.get('/films')]
                );

                setUser(userRes.data);
                setHistory(historyRes.data);
                setAllFilms(filmsRes.data);
            } catch (error) {
                console.error("Gagal mengambil data dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // --- 1. Kalkulasi statistik user---
    const statsData = useMemo(() => {
        let watched = 0;
        let rated = 0;
        let sumRating = 0;

        history.forEach(film => {
            if (film.pivot.is_watched) 
                watched++;
            if (film.pivot.rating > 0) {
                rated++;
                sumRating += film.pivot.rating;
            }
        });

        const avg = rated > 0
            ? (sumRating / rated).toFixed(1)
            : "0.0";

        return [
            {
                label: 'Film ditonton',
                value: watched
            }, {
                label: 'Rating diberikan',
                value: rated
            }, {
                label: 'Rata-rata rating',
                value: `★ ${avg}`,
                isStar: true
            }, // Menggantikan Watchlist
        ];
    }, [history]);

    // --- 2. Kalkulasi genre favorit ---
    const genreStats = useMemo(() => {
        const genreCounts = {};
        let totalGenres = 0;

        // Hitung kemunculan tiap genre dari film yang sudah ditonton/dirating
        history.forEach(film => {
            if (film.genres) {
                film
                    .genres
                    .forEach(g => {
                        genreCounts[g.nama] = (genreCounts[g.nama] || 0) + 1;
                        totalGenres++;
                    });
            }
        });

        if (totalGenres === 0) 
            return []; // Jika belum ada riwayat
        
        // Ubah ke array, hitung persentase, urutkan, dan ambil 4 teratas
        return Object
            .entries(genreCounts)
            .map(([genre, count]) => ({
                genre,
                pct: Math.round((count / totalGenres) * 100)
            }))
            .sort((a, b) => b.pct - a.pct)
            .slice(0, 4);
    }, [history]);

    // --- 3. Filter rekomendasi ---
    const rekomendasi = useMemo(() => {
        // Ambil ID film yang sudah ada di riwayat
        const historyIds = history.map(h => h.id);

        return allFilms
            .filter(film => !historyIds.includes(film.id)) // Hanya yang belum ditonton
            .map(film => ({
                id: film.id,
                judul: film.judul,
                genre: film.genres && film.genres.length > 0
                    ? film
                        .genres
                        .map(g => g.nama)
                        .join(', ')
                    : 'Lainnya',
                poster: film.poster,
                match: Math.floor(Math.random() * (99 - 75 + 1)) + 75, // Simulasi Random
                rating_avg: film.rating_avg
            }))
            .sort((a, b) => b.rating_avg - a.rating_avg) // Urutkan rating tertinggi
            .slice(0, 3); // Ambil 3 teratas
    }, [allFilms, history]);

    // --- 4. Riwayat terakhir ---
    const riwayatTerakhir = useMemo(() => {
        return history
            .slice(0, 3)
            .map(film => ({
                id: film.id,
                judul: film.judul,
                genre: film.genres && film.genres.length > 0
                    ? film
                        .genres[0]
                        .nama
                    : 'Lainnya', // Ambil 1 genre saja agar rapi
                tanggal: new Date(film.pivot.updated_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }),
                rating: film.pivot.rating || 0,
                poster: film.poster
            }));
    }, [history]);

    if (isLoading) {
        return (
            <div
                className="min-h-screen bg-[#141414] flex flex-col items-center justify-center font-sans">
                <div
                    className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 text-sm animate-pulse tracking-wide">Memuat ruang kendali...</p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#141414] font-sans relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="max-w-6xl mx-auto px-6 py-8">

                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-white">
                        Halo,
                        <span className="text-[#a855f7] font-medium">{user.name}</span>! 👋
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Berikut ringkasan aktivitas kamu di CineMatch</p>
                </div>

                {/* Grid Tiga Kolom untuk Statistik Utama */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {
                        statsData.map((s) => (
                            <div
                                key={s.label}
                                className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5 text-center transition hover:border-zinc-700">
                                <div
                                    className={`text-2xl font-bold mb-0.5 ${s.isStar
                                        ? 'text-amber-500'
                                        : 'text-white'}`}>
                                    {s.value}
                                </div>
                                <div className="text-[11px] text-zinc-500 uppercase font-medium tracking-wide">{s.label}</div>
                            </div>
                        ))
                    }
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 flex flex-col gap-6">
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            {/* Blok Rekomendasi Hari Ini */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-sm text-white">Top rekomendasi hari ini</h2>
                                <Link
                                    to="/jelajahi"
                                    className="text-xs text-purple-400 hover:underline transition">Lihat semua →</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {
                                    rekomendasi.length > 0
                                        ? (rekomendasi.map((film) => (
                                            <div
                                                key={film.id}
                                                className="flex items-center gap-3 p-3 bg-[#222222] border border-zinc-800/50 rounded-xl group transition hover:border-zinc-700">
                                                <div
                                                    className="w-10 h-14 bg-[#262626] rounded-lg border border-zinc-800 flex items-center justify-center shrink-0 select-none overflow-hidden">
                                                    {
                                                        film.poster
                                                            ? <img src={film.poster} alt={film.judul} className="w-full h-full object-cover"/>
                                                            : <span className="text-zinc-600 text-[9px] font-medium">Poster</span>
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <Link
                                                        to="/home"
                                                        className="text-sm font-medium text-white transition group-hover:text-purple-400 block">{film.judul}</Link>
                                                    <div
                                                        className="text-xs text-zinc-500 mt-0.5 truncate max-w-[180px] sm:max-w-xs">{film.genre}</div>
                                                </div>
                                                <span
                                                    className="text-[11px] font-medium bg-purple-950/40 text-white border border-purple-900/40 px-2.5 py-1 rounded-full tracking-wide">
                                                    {film.match}% cocok
                                                </span>
                                            </div>
                                        )))
                                        : (
                                            <div
                                                className="text-center py-6 text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-xl">
                                                Kamu sudah menonton semua film Ini!
                                            </div>
                                        )
                                }
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            {/* Blok Riwayat Tontonan Terakhir */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-sm text-white">Riwayat terakhir</h2>
                                <Link
                                    to="/riwayat"
                                    className="text-xs text-purple-400 hover:underline transition">Lihat semua →</Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {
                                    riwayatTerakhir.length > 0
                                        ? (riwayatTerakhir.map((film) => (
                                            <div
                                                key={film.id}
                                                className="flex items-center gap-3 p-3 bg-[#222222] border border-zinc-800/50 rounded-xl group transition hover:border-zinc-700">
                                                <div
                                                    className="w-10 h-14 bg-[#262626] rounded-lg border border-zinc-800 flex items-center justify-center shrink-0 select-none overflow-hidden">
                                                    {
                                                        film.poster
                                                            ? <img src={film.poster} alt={film.judul} className="w-full h-full object-cover"/>
                                                            : <span className="text-zinc-600 text-[9px] font-medium">Poster</span>
                                                    }
                                                </div>
                                                <div className="flex-1">
                                                    <div
                                                        className="text-sm font-medium text-white transition group-hover:text-purple-400">{film.judul}</div>
                                                    <div className="text-xs text-zinc-500 mt-0.5">{film.genre}
                                                        · {film.tanggal}</div>
                                                </div>
                                                {
                                                    film.rating > 0
                                                        ? (
                                                            <div className="flex text-[10px] text-amber-500 tracking-tighter">
                                                                {
                                                                    Array
                                                                        .from({length: 5})
                                                                        .map((_, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className={idx < film.rating
                                                                                    ? 'text-amber-500'
                                                                                    : 'text-zinc-700'}>
                                                                                ★
                                                                            </span>
                                                                        ))
                                                                }
                                                            </div>
                                                        )
                                                        : (
                                                            <Link
                                                                to="/riwayat"
                                                                className="text-[10px] bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1 rounded-lg transition active:scale-95 shadow-sm shadow-purple-600/10">
                                                                Beri rating
                                                            </Link>
                                                        )
                                                }
                                            </div>
                                        )))
                                        : (
                                            <div
                                                className="text-center py-6 text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-xl">
                                                Belum ada riwayat tontonan.
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Panel Statistik Distribusi Genre */}
                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            <h2 className="font-semibold text-sm text-white mb-4">Genre favoritmu</h2>
                            <div className="flex flex-col gap-3.5">
                                {
                                    genreStats.length > 0
                                        ? (genreStats.map((g) => (
                                            <div key={g.genre}>
                                                <div className="flex justify-between text-xs mb-1.5 font-medium">
                                                    <span className="text-zinc-400">{g.genre}</span>
                                                    <span className="text-purple-400">{g.pct}%</span>
                                                </div>
                                                <div
                                                    className="w-full bg-[#262626] rounded-full h-1.5 border border-zinc-800/40 overflow-hidden">
                                                    <div
                                                        className="bg-purple-500 h-1.5 rounded-full shadow-sm shadow-purple-500/20"
                                                        style={{
                                                            width: `${g.pct}%`
                                                        }}/>
                                                </div>
                                            </div>
                                        )))
                                        : (
                                            <div
                                                className="text-center py-6 text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-xl">
                                                Tonton film untuk melihat data genre.
                                            </div>
                                        )
                                }
                            </div>
                        </div>

                        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-5">
                            {/* Panel Menu Tautan Cepat */}
                            <h2 className="font-semibold text-sm text-white mb-4">Menu cepat</h2>
                            <div className="flex flex-col gap-1">
                                <Link
                                    to="/jelajahi"
                                    className="flex items-center gap-2.5 text-xs text-zinc-400 hover:bg-[#222222] hover:text-white px-3 py-2 rounded-lg transition">
                                    <span className="text-sm">🎬</span>
                                    Jelajahi film
                                </Link>
                                <Link
                                    to="/riwayat"
                                    className="flex items-center gap-2.5 text-xs text-zinc-400 hover:bg-[#222222] hover:text-white px-3 py-2 rounded-lg transition">
                                    <span className="text-sm">📋</span>
                                    Riwayat tontonan
                                </Link>
                                <Link
                                    to="/profil"
                                    className="flex items-center gap-2.5 text-xs text-zinc-400 hover:bg-[#222222] hover:text-white px-3 py-2 rounded-lg transition">
                                    <span className="text-sm">👤</span>
                                    Edit profil
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}