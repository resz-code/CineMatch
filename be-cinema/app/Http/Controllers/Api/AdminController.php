<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    // ==========================================
    // MANAJEMEN FILM
    // ==========================================

    // 1. Tambah Film Baru
    public function storeFilm(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'genre_ids' => 'required|array',
            'genre_ids.*' => 'exists:genres,id',
            'tahun' => 'required|integer',
            'sinopsis' => 'required|string',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'rating_default' => 'nullable|numeric|min:0|max:5',
        ]);

        $posterPath = null;
        if ($request->hasFile('poster')) {
            $posterPath = $request->file('poster')->store('posters', 'public');
        }

        $film = Film::create([
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'sinopsis' => $request->sinopsis,
            'poster' => $posterPath,
            'rating_avg' => 0, 
            'rating_default' => $request->rating_default,
            'is_active' => true,
        ]);

        $film->genres()->attach($request->genre_ids);

        return response()->json(['message' => 'Film berhasil ditambahkan', 'data' => $film], 201);
    }

    // 2. Edit Film
    public function updateFilm(Request $request, $id)
    {
        $film = Film::findOrFail($id);

        $request->validate([
            'judul' => 'required|string|max:255',
            'tahun' => 'required|integer',
            'sinopsis' => 'required|string',
            'poster' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'rating_default' => 'nullable|numeric|min:0|max:5', 
        ]);

        if ($request->hasFile('poster')) {
            if ($film->getRawOriginal('poster')) {
                Storage::disk('public')->delete($film->getRawOriginal('poster'));
            }
            $film->poster = $request->file('poster')->store('posters', 'public');
        }

        $film->update([
            'judul' => $request->judul,
            'tahun' => $request->tahun,
            'sinopsis' => $request->sinopsis,
            'rating_default' => $request->rating_default,
        ]);

        if ($request->has('genre_ids')) {
            $film->genres()->sync($request->genre_ids);
        }

        return response()->json(['message' => 'Film berhasil diperbarui', 'data' => $film]);
    }

    // 3. Hapus Film
    public function destroyFilm($id)
    {
        $film = Film::findOrFail($id);
        
        // Hapus file gambar dari storage
        if ($film->getRawOriginal('poster')) {
            Storage::disk('public')->delete($film->getRawOriginal('poster'));
        }
        
        $film->delete();

        return response()->json(['message' => 'Film berhasil dihapus']);
    }

    // 4. Toggle Status Film (Aktif / Nonaktif)
    public function toggleFilmStatus($id)
    {
        $film = Film::findOrFail($id);
        $film->update(['is_active' => !$film->is_active]);

        $status = $film->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return response()->json(['message' => "Film berhasil $status", 'is_active' => $film->is_active]);
    }


    // ==========================================
    // MANAJEMEN USER
    // ==========================================

    // 5. Toggle Status User (Aktif / Banned)
    public function toggleUserStatus($id)
    {
        $user = User::findOrFail($id);
        
        // Mencegah admin menonaktifkan dirinya sendiri
        if (request()->user()->id === $user->id) {
            return response()->json(['message' => 'Anda tidak bisa menonaktifkan akun sendiri'], 403);
        }

        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return response()->json(['message' => "User berhasil $status", 'is_active' => $user->is_active]);
    }

    public function getUsers()
{
    $users = User::where('role', 'user')
        ->with('genres')
        ->withCount(['interactedFilms as interacted_films_count' => function ($query) {
            $query->where('film_user.is_watched', true);
        }])
        ->withCount(['interactedFilms as ratings_count' => function ($query) {
            $query->whereNotNull('film_user.rating');
        }])
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($users, 200);
}
}