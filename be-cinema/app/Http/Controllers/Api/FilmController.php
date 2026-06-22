<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $query = Film::with('genre');

        // Fitur Pencarian Judul
        if ($request->has('search') && $request->search != '') {
            $query->where('judul', 'like', '%' . $request->search . '%');
        }

        // Fitur Filter Genre
        if ($request->has('genre') && $request->genre !== 'Semua') {
            $query->whereHas('genre', function ($q) use ($request) {
                $q->where('nama', $request->genre);
            });
        }

        // Mengambil semua data (bisa diubah menggunakan ->paginate(10) nanti jika film sudah banyak)
        $films = $query->orderBy('rating_avg', 'desc')->get();

        return response()->json($films);
    }

    public function show($id)
    {
        // Cari film berdasarkan ID, sekalian bawa data genrenya
        $film = \App\Models\Film::with('genre')->find($id);

        // Jika film tidak ditemukan di database
        if (!$film) {
            return response()->json([
                'message' => 'Film tidak ditemukan'
            ], 404);
        }

        // Jika ditemukan, kembalikan data filmnya
        return response()->json($film, 200);
    }
}