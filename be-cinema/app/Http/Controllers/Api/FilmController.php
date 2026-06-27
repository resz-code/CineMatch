<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $query = Film::with('genres')->where('is_active', true);

        // Fitur Pencarian Judul
        if ($request->has('search') && $request->search != '') {
            $query->where('judul', 'like', '%' . $request->search . '%');
        }

        // Fitur Filter Genre
        if ($request->has('genre') && $request->genre !== 'Semua') {
            $query->whereHas('genres', function ($q) use ($request) {
                $q->where('nama', $request->genre);
            });
        }

        // Mengambil semua data 
        $films = $query->orderBy('rating_avg', 'desc')->get();

        return response()->json($films);
    }

    public function show($id)
    {
        $film = \App\Models\Film::with('genres')->where('is_active', true)->find($id);
        // Jika film tidak ditemukan di database
        if (!$film) {
            return response()->json([
                'message' => 'Film tidak ditemukan atau sedang dinonaktifkan'
            ], 404);
        }

        // Jika ditemukan, kembalikan data filmnya
        return response()->json($film, 200);
    }
}