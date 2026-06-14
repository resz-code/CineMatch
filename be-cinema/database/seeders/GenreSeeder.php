<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    public function run()
    {
        $genres = [
            'Sci-Fi', 'Drama', 'Aksi', 'Komedi', 'Horor', 
            'Animasi', 'Romansa', 'Fantasi', 'Misteri', 
            'Thriller', 'Petualangan', 'Dokumenter'
        ];

        foreach ($genres as $genre) {
            DB::table('genres')->insert([
                'nama' => $genre,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}