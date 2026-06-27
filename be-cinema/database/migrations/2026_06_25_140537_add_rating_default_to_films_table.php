<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('films', function (Blueprint $table) {
            // Menggunakan decimal(3,1) agar bisa menyimpan angka seperti 4.5, 4.8, dll.
            $table->decimal('rating_default', 3, 1)->nullable()->after('rating_avg');
        });
    }

    public function down(): void
    {
        Schema::table('films', function (Blueprint $table) {
            $table->dropColumn('rating_default');
        });
    }
};