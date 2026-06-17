<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

use App\Http\Controllers\AuthController;

// Pintu masuk (Endpoint) untuk registrasi
Route::post('/register', [AuthController::class, 'register']);
