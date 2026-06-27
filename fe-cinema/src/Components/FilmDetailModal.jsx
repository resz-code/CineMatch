import {useState, useEffect} from 'react';

export default function FilmDetailModal(
    {isOpen, onClose, film, onWatch, onRate}
) {
    // State rating kita pindahkan ke dalam komponen ini agar lebih rapi
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Reset rating ketika film yang dibuka berubah
    useEffect(() => {
        if (film) {
            setUserRating(
                film.my_rating || film.user_rating || film.pivot
                    ?.rating || 0
            );
        } else {
            setUserRating(0);
        }
    }, [film]);

    if (!isOpen || !film) 
        return null;
    
    const handleRatingClick = (star) => {
        setUserRating(star);
        if (onRate) 
            onRate(star);
        };
    
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">
            <div
                className="bg-[#1a1a1a] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 p-6 shadow-2xl relative transition-all duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-width:none">

                {/* Tombol Kembali */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition text-xs font-medium border border-zinc-700/50">
                    ← Kembali
                </button>

                <div
                    className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mb-4 border-b border-zinc-800/80 pb-2 pr-20">
                    Detail Informasi Film
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                    {/* Kolom Kiri: Poster & Tombol */}
                    <div className="flex flex-col gap-3">
                        <div
                            className="w-full h-auto bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                            {
                                film.poster
                                    ? (
                                        <img
                                            src={film.poster}
                                            alt={film.judul}
                                            className="w-full h-auto block object-contain"/>
                                    )
                                    : (<span className="py-20 text-zinc-600 text-xs font-medium">Poster film</span>)
                            }
                        </div>
                        <button
                            onClick={onWatch}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2.5 rounded-lg shadow-md shadow-purple-600/10 active:scale-95 transition">
                            🍿 Tonton Sekarang
                        </button>
                    </div>

                    {/* Kolom Kanan: Detail & Interaksi */}
                    <div className="sm:col-span-2 flex flex-col gap-4">
                        <div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <h2 className="text-2xl font-bold text-white leading-tight">{film.judul}</h2>
                                <span className="text-sm font-normal text-zinc-500">({film.tahun})</span>
                            </div>
                            <p className="text-zinc-500 text-xs mt-1">{film.info}</p>
                        </div>

                        {/* List Genre */}
                        <div className="flex gap-2 flex-wrap">
                            {
                                film
                                    .genre
                                    .split(', ')
                                    .map(g => (
                                        <span
                                            key={g}
                                            className="text-[10px] bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full border border-zinc-700">
                                            {g}
                                        </span>
                                    ))
                            }
                        </div>

                        {/* Sinopsis */}
                        <div className="bg-[#121212] border border-zinc-800/80 rounded-xl p-4">
                            <h4
                                className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">Sinopsis</h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">{film.sinopsis}</p>
                        </div>

                        {/* Area Rating Bintang */}
                        <div
                            className="bg-[#222222]/50 border border-zinc-800 rounded-xl p-3 flex flex-col gap-1.5">
                            <div>
                                <h4 className="text-xs font-semibold text-white">Beri Rating Film</h4>
                                <p className="text-[10px] text-zinc-500">Beri bintang untuk melatih akurasi AI sistem rekomendasi</p>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                                {
                                    [1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none"
                                            onClick={() => handleRatingClick(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}>
                                            <span
                                                className={(
                                                    star <= (hoverRating || userRating))
                                                    ? 'text-yellow-400'
                                                    : 'text-zinc-700'}>★</span>
                                        </button>
                                    ))
                                }
                                {
                                    userRating > 0 && (
                                        <span className="text-[10px] font-medium text-emerald-400 ml-2 animate-pulse">
                                            Kamu memilih ★ {userRating}
                                        </span>
                                    )
                                }
                            </div>
                        </div>

                        {/* Persentase Match & Rating Default Admin */}
                        <div
                            className="flex items-center gap-2 flex-wrap pt-1 border-t border-zinc-800/60 mt-1">
                            <span
                                className="text-[10px] bg-purple-950/80 text-purple-400 border border-purple-900/40 px-2.5 py-0.5 rounded font-bold">
                                {film.match}% Match
                            </span>
                            <span
                                className="text-[10px] bg-amber-950/80 text-amber-400 border border-amber-900/40 px-2.5 py-0.5 rounded font-bold">
                                ★ {film.rating_default}
                                Global
                            </span>
                            <span className="text-zinc-500 text-[10px]">Berdasarkan preferensimu</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}