<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\InteractionController;

// Route Publik (Tidak butuh token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route Private (Hanya bisa diakses jika menyertakan Token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/films', [FilmController::class, 'index']);
    Route::get('/films/{id}', [FilmController::class, 'show']);
    Route::put('/user/profile', [ProfileController::class, 'updateProfile']);
    Route::put('/user/genres', [ProfileController::class, 'updateGenres']);
    Route::put('/user/password', [ProfileController::class, 'updatePassword']);
    Route::get('/user/history', [InteractionController::class, 'history']);
    Route::post('/films/{id}/watch', [InteractionController::class, 'toggleWatch']);
    Route::post('/films/{id}/rate', [InteractionController::class, 'rateFilm']);

    Route::prefix('admin')->group(function () {
        // Film Method CRUD
        Route::post('/films', [AdminController::class, 'storeFilm']);
        Route::post('/films/{id}', [AdminController::class, 'updateFilm']);
        Route::put('/films/{id}', [AdminController::class, 'updateFilm']);
        Route::delete('/films/{id}', [AdminController::class, 'destroyFilm']);
        Route::patch('/films/{id}/toggle-status', [AdminController::class, 'toggleFilmStatus']);
        
        // User Management
        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::patch('/users/{id}/toggle-status', [AdminController::class, 'toggleUserStatus']);
    });

    // Endpoint untuk mengambil data user yang sedang login
    Route::get('/user', function () {
        return request()->user()->load('genres');
    });
});