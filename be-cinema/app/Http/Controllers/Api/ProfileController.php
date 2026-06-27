<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    // 1. Mengubah Nama dan Email
    public function updateProfile(Request $request)
    {
        $user = request()->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Profil berhasil diperbarui',
            'user' => $user
        ]);
    }

    // 2. Mengubah Preferensi Genre (Untuk Algoritma ML)
    public function updateGenres(Request $request)
    {
        $request->validate([
            'genres' => 'required|array|min:3',
        ]);

        $user = request()->user();

        // Cari ID genre berdasarkan nama array teks yang dikirim dari React
        $genreIds = Genre::whereIn('nama', $request->genres)->pluck('id');

        // Menggunakan sync() agar data lama dihapus dan digantikan dengan data baru di tabel pivot user_genres
        $user->genres()->sync($genreIds);

        return response()->json([
            'message' => 'Preferensi genre berhasil diperbarui'
        ]);
    }

    // 3. Mengubah Password Akun
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = request()->user();

        // Validasi apakah password lama yang dimasukkan sesuai dengan di database
        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password lama yang Anda masukkan salah.'],
            ]);
        }

        // Simpan password baru yang sudah di-hash
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password berhasil diubah'
        ]);
    }
}