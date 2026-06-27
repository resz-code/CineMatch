<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class InteractionController extends Controller
{
    public function history(Request $request)
    {
        $user = $request->user();
        $films = $user->interactedFilms()
            ->where(function($query) {
                $query->where('film_user.is_watched', true)
                      ->orWhereNotNull('film_user.rating');
            })
            ->with('genres')
            ->orderBy('film_user.updated_at', 'desc')
            ->get();

        return response()->json($films);
    }

    public function toggleWatch(Request $request, $id)
    {
        $user = $request->user();
        $film = Film::findOrFail($id);
        $interaction = $user->interactedFilms()->where('films.id', $id)->first();

        if ($interaction) {
            $currentStatus = $interaction->pivot->is_watched;
            $user->interactedFilms()->updateExistingPivot($id, ['is_watched' => !$currentStatus]);
            $isWatched = !$currentStatus;
        } else {
            $user->interactedFilms()->attach($id, ['is_watched' => true]);
            $isWatched = true;
        }

        return response()->json([
            'message' => $isWatched ? 'Ditambahkan ke riwayat' : 'Dihapus dari riwayat',
            'is_watched' => $isWatched
        ]);
    }

    public function rateFilm(Request $request, $id)
    {
        $request->validate(['rating' => 'required|integer|min:1|max:5']);
        $user = $request->user();
        $film = Film::findOrFail($id);
        $interaction = $user->interactedFilms()->where('films.id', $id)->first();

        if ($interaction) {
            $user->interactedFilms()->updateExistingPivot($id, ['rating' => $request->rating]);
        } else {
            $user->interactedFilms()->attach($id, ['rating' => $request->rating]);
        }

        // Hitung ulang rata-rata global
        $avgRating = $film->interactingUsers()->whereNotNull('film_user.rating')->avg('film_user.rating');
        $film->update(['rating_avg' => round((float)$avgRating, 1)]);

        return response()->json([
            'message' => 'Rating berhasil disimpan',
            'rating_anda' => $request->rating,
            'rating_global_baru' => $film->rating_avg
        ]);
    }
}