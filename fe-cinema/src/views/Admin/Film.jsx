import {useState, useEffect} from 'react';
import axios from '../../api/axios';
import Notification from '../../Components/Notification';

export default function AdminFilm() {
    const [search, setSearch] = useState('');
    const [filmList, setFilmList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // State untuk Notifikasi
    const [toast, setToast] = useState({message: '', type: 'success'});

    // Daftar ID Genre disesuaikan database
    const availableGenres = [
        {
            id: 1,
            nama: 'Sci-Fi'
        }, {
            id: 2,
            nama: 'Drama'
        }, {
            id: 3,
            nama: 'Aksi'
        }, {
            id: 4,
            nama: 'Komedi'
        }, {
            id: 5,
            nama: 'Horor'
        }, {
            id: 6,
            nama: 'Animasi'
        }, {
            id: 7,
            nama: 'Romansa'
        }, {
            id: 8,
            nama: 'Fantasi'
        }, {
            id: 9,
            nama: 'Misteri'
        }, {
            id: 10,
            nama: 'Thriller'
        }, {
            id: 11,
            nama: 'Petualangan'
        }, {
            id: 12,
            nama: 'Dokumenter'
        }
    ];

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);

    const [selectedFilm, setSelectedFilm] = useState(null);
    const [newFilm, setNewFilm] = useState({
        judul: '',
        genre_ids: [],
        tahun: '',
        sinopsis: '',
        rating_default: 0,
        poster: null
    });

    // --- 1. Read: ambil data film ---
    const fetchFilms = async () => {
        try {
            const response = await axios.get('/films');
            const formatted = response
                .data
                .map(film => ({
                    id: film.id,
                    judul: film.judul,
                    tahun: film.tahun,
                    genre: film.genres
                        ? film
                            .genres
                            .map(g => g.nama)
                            .join(', ')
                        : 'Lainnya',
                    genre_ids: film.genres
                        ? film
                            .genres
                            .map(g => g.id)
                        : [],
                    rating: film.rating_avg,
                    sinopsis: film.sinopsis,
                    rating_default: film.rating_default || 0,
                    status: film.is_active
                        ? 'Aktif'
                        : 'Nonaktif'
                }));
            setFilmList(formatted);
        } catch (error) {
            console.error("Gagal mengambil data film:", error);
            setToast({message: 'Gagal memuat katalog film.', type: 'error'});
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const filtered = filmList.filter(
        f => f.judul.toLowerCase().includes(search.toLowerCase()) || f.genre.toLowerCase().includes(search.toLowerCase())
    );

    const toggleGenre = (id, isEdit = false) => {
        const target = isEdit
            ? selectedFilm
            : newFilm;
        const setTarget = isEdit
            ? setSelectedFilm
            : setNewFilm;
        const currentIds = target.genre_ids || [];

        if (currentIds.includes(id)) {
            setTarget({
                ...target,
                genre_ids: currentIds.filter(gid => gid !== id)
            });
        } else {
            setTarget({
                ...target,
                genre_ids: [
                    ...currentIds,
                    id
                ]
            });
        }
    };

    // --- 2. Create: tambah film ---
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        if (newFilm.genre_ids.length === 0) {
            setToast({message: 'Pilih minimal 1 genre film!', type: 'error'});
            return;
        }

        setIsSaving(true);
        const formData = new FormData();
        formData.append('judul', newFilm.judul);
        formData.append('tahun', newFilm.tahun);
        formData.append('sinopsis', newFilm.sinopsis);
        formData.append('rating_default', newFilm.rating_default);
        newFilm
            .genre_ids
            .forEach(id => formData.append('genre_ids[]', id));
        if (newFilm.poster) {
            formData.append('poster', newFilm.poster);
        }

        try {
            await axios.post('/admin/films', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowModal(false);
            setNewFilm({
                judul: '',
                genre_ids: [],
                tahun: '',
                sinopsis: '',
                rating_default: 0,
                poster: null
            });
            setToast({message: 'Film berhasil ditambahkan!', type: 'success'});
            fetchFilms();
        } catch (error) {
            const errorMsg = error.response
                ?.data
                    ?.message || "Gagal menyimpan film. Cek kembali form anda.";
            setToast({message: errorMsg, type: 'error'});
        } finally {
            setIsSaving(false);
        }
    };

    // --- 3. Update: edit film ---
    const openEditModal = (film) => {
        setSelectedFilm({
            ...film,
            poster: null
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (selectedFilm.genre_ids.length === 0) {
            setToast({message: 'Pilih minimal 1 genre film!', type: 'error'});
            return;
        }

        setIsSaving(true);
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('judul', selectedFilm.judul);
        formData.append('tahun', selectedFilm.tahun);
        formData.append('sinopsis', selectedFilm.sinopsis);
        formData.append('rating_default', selectedFilm.rating_default);
        selectedFilm
            .genre_ids
            .forEach(id => formData.append('genre_ids[]', id));

        if (selectedFilm.poster) {
            formData.append('poster', selectedFilm.poster);
        }

        try {
            await axios.post(`/admin/films/${selectedFilm.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setShowEditModal(false);
            setSelectedFilm(null);
            setToast({message: 'Perubahan film berhasil disimpan!', type: 'success'});
            fetchFilms();
        } catch (error) {
            const errorMsg = error.response
                ?.data
                    ?.message || "Gagal mengupdate film.";
            setToast({message: errorMsg, type: 'error'});
        } finally {
            setIsSaving(false);
        }
    };

    // --- 4. Delete: hapus film ---
    const openDeleteModal = (film) => {
        setSelectedFilm(film);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/admin/films/${selectedFilm.id}`);
            setShowDeleteModal(false);
            setSelectedFilm(null);
            setToast({message: 'Film berhasil dihapus secara permanen.', type: 'success'});
            fetchFilms();
        } catch (error) {
            setToast({message: 'Gagal menghapus film.', type: 'error'});
        }
    };

    // --- 5. Toggle status ---
    const openStatusModal = (film) => {
        setSelectedFilm(film);
        setShowStatusModal(true);
    };

    const handleStatusConfirm = async () => {
        try {
            await axios.patch(`/admin/films/${selectedFilm.id}/toggle-status`);
            setShowStatusModal(false);
            setSelectedFilm(null);
            setToast({message: 'Status film berhasil diubah.', type: 'success'});
            fetchFilms();
        } catch (error) {
            setToast({message: 'Gagal mengubah status film.', type: 'error'});
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] font-sans text-white relative">

            {/* Memanggil Komponen Notifikasi */}
            <Notification
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({message: '', type: ''})}/>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-medium">Kelola Film</h1>
                        <p className="text-sm text-zinc-400 mt-1">Total {filmList.length}
                            film terdaftar</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition active:scale-95 shadow-sm shadow-purple-600/20">
                        + Tambah film
                    </button>
                </div>

                {/* Search */}
                <div className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul atau genre..."
                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"/>
                </div>

                {/* Table */}
                <div
                    className="bg-[#1a1a1a] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    {
                        isLoading
                            ? (
                                <div className="text-center py-10 text-zinc-500 text-sm animate-pulse">Memuat data film...</div>
                            )
                            : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-zinc-300">
                                        <thead
                                            className="bg-[#141414] border-b border-zinc-800 text-xs text-zinc-500 font-medium tracking-wider uppercase">
                                            <tr>
                                                <th className="text-left px-5 py-3">No</th>
                                                <th className="text-left px-5 py-3">Judul</th>
                                                <th className="text-left px-5 py-3">Genre</th>
                                                <th className="text-left px-5 py-3">Tahun</th>
                                                <th className="text-left px-5 py-3">Rating</th>
                                                <th className="text-left px-5 py-3">Status</th>
                                                <th className="text-right px-5 py-3">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filtered.map((film, index) => (
                                                    <tr
                                                        key={film.id}
                                                        className="border-b border-zinc-800/50 hover:bg-[#222222]/50 transition-colors">
                                                        <td className="px-5 py-3 text-zinc-500">{index + 1}</td>
                                                        <td className="px-5 py-3 font-medium text-zinc-200">{film.judul}</td>
                                                        <td className="px-5 py-3">
                                                            <div className="flex flex-wrap gap-1">
                                                                {
                                                                    film
                                                                        .genre
                                                                        .split(', ')
                                                                        .map((g, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className="text-[9px] bg-purple-950/50 text-purple-400 border border-purple-900/30 px-2 py-0.5 rounded-full font-medium">
                                                                                {g}
                                                                            </span>
                                                                        ))
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3 text-zinc-400">{film.tahun}</td>
                                                        <td className="px-5 py-3 text-zinc-300">
                                                            <span className="text-amber-500 mr-1 text-[10px]">★</span>
                                                            {film.rating}
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <button
                                                                onClick={() => openStatusModal(film)}
                                                                className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium border transition transform active:scale-95 cursor-pointer ${
                                                                film.status === 'Aktif'
                                                                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30 hover:bg-emerald-900/' +
                                                                            '40'
                                                                    : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:bg-zinc-800'}`}>
                                                                {film.status}
                                                            </button>
                                                        </td>
                                                        <td className="px-5 py-3 text-right">
                                                            <button
                                                                onClick={() => openEditModal(film)}
                                                                className="text-[11px] font-medium text-purple-400 hover:text-purple-300 hover:underline mr-3 transition">Edit</button>
                                                            <button
                                                                onClick={() => openDeleteModal(film)}
                                                                className="text-[11px] font-medium text-red-400/90 hover:text-red-400 hover:underline transition">Hapus</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                    }
                    {
                        !isLoading && filtered.length === 0 && (
                            <div className="text-center py-10 text-zinc-500 text-sm">Tidak ada film yang sesuai dengan pencarian</div>
                        )
                    }
                </div>
            </div>

            {/* Modal: tambah film */}
            {
                showModal && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div
                            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            <h2 className="font-medium text-base mb-5">Tambah film baru</h2>
                            <form onSubmit={handleAddSubmit}>
                                <div className="mb-3">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Judul film</label>
                                    <input
                                        type="text"
                                        required="required"
                                        value={newFilm.judul}
                                        onChange={(e) => setNewFilm({
                                            ...newFilm,
                                            judul: e.target.value
                                        })}
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                                        placeholder="Masukkan judul film"/>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label
                                            className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Tahun rilis</label>
                                        <input
                                            type="number"
                                            min="1900"
                                            max="2099"
                                            required="required"
                                            value={newFilm.tahun}
                                            onChange={(e) => setNewFilm({
                                                ...newFilm,
                                                tahun: e.target.value
                                            })}
                                            className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                                            placeholder="2026"/>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Rating Default (TMDB)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={newFilm.rating_default}
                                            onChange={(e) => setNewFilm({
                                                ...newFilm,
                                                rating_default: e.target.value
                                            })}
                                            className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition"
                                            placeholder="4.5"/>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Pilih Multi-Genre
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {
                                            availableGenres.map(g => (
                                                <button
                                                    key={g.id}
                                                    type="button"
                                                    onClick={() => toggleGenre(g.id, false)}
                                                    className={`px-2.5 py-1 rounded-full border text-[10px] font-medium transition ${
                                                    newFilm
                                                        .genre_ids
                                                        .includes(g.id)
                                                            ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                                                            : 'bg-[#141414] border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-wh' +
                                                                    'ite'}`}>
                                                    {g.nama}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Poster (Gambar)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setNewFilm({
                                            ...newFilm,
                                            poster: e
                                                .target
                                                .files[0]
                                        })}
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition"/>
                                </div>

                                <div className="mb-6">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Sinopsis</label>
                                    <textarea
                                        required="required"
                                        value={newFilm.sinopsis}
                                        onChange={(e) => setNewFilm({
                                            ...newFilm,
                                            sinopsis: e.target.value
                                        })}
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition resize-none"
                                        rows="3"
                                        placeholder="Tuliskan sinopsis singkat..."></textarea>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => setShowModal(false)}
                                        className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95 disabled:opacity-50">Batal</button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-purple-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95 flex items-center gap-2 disabled:opacity-50">
                                        {
                                            isSaving
                                                ? (
                                                    <svg
                                                        className="animate-spin h-4 w-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24">
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                )
                                                : 'Simpan Film'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Modal: edit film */}
            {
                showEditModal && selectedFilm && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div
                            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            <h2 className="font-medium text-base mb-5">Edit film</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div className="mb-3">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Judul film</label>
                                    <input
                                        type="text"
                                        required="required"
                                        value={selectedFilm.judul}
                                        onChange={(e) => setSelectedFilm({
                                            ...selectedFilm,
                                            judul: e.target.value
                                        })}
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition"/>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label
                                            className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Tahun rilis</label>
                                        <input
                                            type="number"
                                            min="1900"
                                            max="2099"
                                            required="required"
                                            value={selectedFilm.tahun}
                                            onChange={(e) => setSelectedFilm({
                                                ...selectedFilm,
                                                tahun: parseInt(e.target.value) || ''
                                            })}
                                            className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition"/>
                                    </div>
                                    <div>
                                        <label
                                            className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Rating Default</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={selectedFilm.rating_default}
                                            onChange={(e) => setSelectedFilm({
                                                ...selectedFilm,
                                                rating_default: e.target.value
                                            })}
                                            className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition"/>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Edit Multi-Genre
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {
                                            availableGenres.map(g => (
                                                <button
                                                    key={g.id}
                                                    type="button"
                                                    onClick={() => toggleGenre(g.id, true)}
                                                    className={`px-2.5 py-1 rounded-full border text-[10px] font-medium transition ${
                                                    selectedFilm.genre_ids && selectedFilm
                                                        .genre_ids
                                                        .includes(g.id)
                                                            ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                                                            : 'bg-[#141414] border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-wh' +
                                                                    'ite'}`}>
                                                    {g.nama}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Ganti Poster (Opsional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelectedFilm({
                                            ...selectedFilm,
                                            poster: e
                                                .target
                                                .files[0]
                                        })}
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-400 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-700 file:text-zinc-300 hover:file:bg-zinc-600 transition"/>
                                </div>

                                <div className="mb-6">
                                    <label
                                        className="block text-xs font-medium text-zinc-400 mb-1 uppercase tracking-wider">Sinopsis</label>
                                    <textarea
                                        required="required"
                                        value={selectedFilm.sinopsis}
                                        onChange={(e) => setSelectedFilm({
                                            ...selectedFilm,
                                            sinopsis: e.target.value
                                        })}
                                        className="w-full bg-[#141414] border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition resize-none"
                                        rows="3"></textarea>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        disabled={isSaving}
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setSelectedFilm(null);
                                        }}
                                        className="border border-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95 disabled:opacity-50">Batal</button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-purple-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95 flex items-center gap-2 disabled:opacity-50">
                                        {
                                            isSaving
                                                ? (
                                                    <svg
                                                        className="animate-spin h-4 w-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24">
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                )
                                                : 'Simpan Perubahan'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Modal popoup baru: konfirmasi ubah status */}
            {
                showStatusModal && selectedFilm && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div
                            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
                            <p className="text-sm text-zinc-200 mb-6 font-medium">
                                Apakah anda yakin ingin mengubah status film
                                <span className="text-purple-400">"{selectedFilm.judul}"</span>
                                menjadi
                                <span
                                    className={selectedFilm.status === 'Aktif'
                                        ? 'text-zinc-400'
                                        : 'text-emerald-400'}>"{
                                        selectedFilm.status === 'Aktif'
                                            ? 'Nonaktif'
                                            : 'Aktif'
                                    }"</span>?
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowStatusModal(false);
                                        setSelectedFilm(null);
                                    }}
                                    className="border border-zinc-700 text-zinc-400 px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95">
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleStatusConfirm}
                                    className="bg-purple-600 px-6 py-1.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition shadow-sm shadow-purple-600/20 active:scale-95">
                                    Ya
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Modal: konfirmasi hapus */}
            {
                showDeleteModal && selectedFilm && (
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div
                            className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
                            <div
                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-950/50 border border-red-900/30 text-red-400 text-xl mb-4">⚠️</div>
                            <p className="text-sm text-zinc-200 mb-6 font-medium">
                                Apakah anda yakin untuk menghapus film
                                <span className="text-purple-400">"{selectedFilm.judul}"</span>
                                ini secara permanen?
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedFilm(null);
                                    }}
                                    className="border border-zinc-700 text-zinc-400 px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-zinc-800 hover:text-white transition active:scale-95">Batal</button>
                                <button
                                    type="button"
                                    onClick={handleDeleteConfirm}
                                    className="bg-red-600 px-6 py-1.5 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm shadow-red-600/20 active:scale-95">Ya, Hapus</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
}