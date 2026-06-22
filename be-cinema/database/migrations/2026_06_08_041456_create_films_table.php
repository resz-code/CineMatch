<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
    Schema::create('films', function (Blueprint $table) {
        $table->id();
        $table->string('judul');
        $table->foreignId('genre_id')->constrained('genres')->onDelete('cascade');
        $table->integer('tahun');
        $table->text('sinopsis')->nullable();
        $table->string('poster')->nullable();
        $table->float('rating_avg')->default(0);
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
