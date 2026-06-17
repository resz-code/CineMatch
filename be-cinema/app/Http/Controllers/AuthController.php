<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. Validasi data dari React
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            // TODO: Jika database sudah siap untuk menyimpan 'genres',
            // bisa tambahkan proses penyimpanannya nanti di sini.
        ]);

        // 2. Simpan user ke database Laragon
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 3. Beri balasan sukses ke React
        return response()->json([
            'message' => 'Registrasi Berhasil',
            'user' => $user
        ], 201);
    }
}