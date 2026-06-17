<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

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

    public function login(Request $request)
    {
        // 1. Validasi inputan dari React (Email dan Password wajib diisi)
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Cek kecocokan email dan password di database
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            
            // 3. Jika cocok, beri balasan sukses ke React
            return response()->json([
                'message' => 'Login Berhasil',
                'user' => $user
            ], 200);
        }

        // 4. Jika tidak cocok (salah password/email), tolak!
        return response()->json([
            'message' => 'Email atau Password salah'
        ], 401);
    }
}