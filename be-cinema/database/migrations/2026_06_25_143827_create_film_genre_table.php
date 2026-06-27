<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Buat tabel pivot film_genre
        Schema::create('film_genre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('film_id')->constrained()->onDelete('cascade');
            $table->foreignId('genre_id')->constrained()->onDelete('cascade');
        });

        // 2. Hapus kolom genre_id dari tabel films (karena sudah tidak dipakai)
        Schema::table('films', function (Blueprint $table) {
            $table->dropForeign(['genre_id']); 
            $table->dropColumn('genre_id');
        });
    }

    public function down(): void
    {
        Schema::table('films', function (Blueprint $table) {
            $table->foreignId('genre_id')->nullable()->constrained()->onDelete('set null');
        });
        Schema::dropIfExists('film_genre');
    }
};