<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Route Publik (Tidak butuh token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route Terproteksi (Hanya bisa diakses jika menyertakan Token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Endpoint untuk mengambil data user yang sedang login
    Route::get('/user', function () {
        return request()->user()->load('genres');
    });
});