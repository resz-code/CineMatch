<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/home', function () {
    return Inertia::render('User/Home');
})->middleware(['auth', 'verified'])->name('home');


Route::get('/profil', function () {
    return Inertia::render('User/Profil');
})->middleware(['auth', 'verified'])->name('profil');

Route::get('/jelajahi', function () {
    return Inertia::render('User/Jelajahi');
})->middleware(['auth', 'verified'])->name('jelajahi');

Route::get('/riwayat', function () {
    return Inertia::render('User/Riwayat');
})->middleware(['auth', 'verified'])->name('riwayat');

Route::get('/profil', function () {
    return Inertia::render('User/Profil');
})->middleware(['auth', 'verified'])->name('profil');

Route::get('/dashboard-user', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard.user');

Route::get('/home', function () {
    return Inertia::render('User/Home');
})->middleware(['auth', 'verified'])->name('home');

Route::get('/dashboard-user', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard.user');
