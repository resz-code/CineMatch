<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilmSeeder extends Seeder
{
    public function run()
    {
        $films = [
            [
                'judul' => 'Interstellar',
                'genre_id' => 1,
                'tahun' => 2014,
                'sinopsis' => 'Sekelompok penjelajah menggunakan wormhole untuk melampaui batasan perjalanan ruang angkasa.',
                'rating_avg' => 4.8,
                'poster' => 'posters/interstellar.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'The Dark Knight',
                'genre_id' => 3,
                'tahun' => 2008,
                'sinopsis' => 'Batman harus menerima ujian psikologis dan fisik terbesarnya untuk melawan Joker.',
                'rating_avg' => 4.9,
                'poster' => 'posters/dark-knight.jpg', 
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Spirited Away',
                'genre_id' => 6,
                'tahun' => 2001,
                'sinopsis' => 'Seorang gadis berusia 10 tahun mengembara ke dunia yang dikuasai oleh roh dan dewa.',
                'rating_avg' => 4.7,
                'poster' => 'posters/spirited-away.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Parasite',
                'genre_id' => 2,
                'tahun' => 2019,
                'sinopsis' => 'Keserakahan mengancam hubungan simbiosis antara keluarga kaya dan miskin.',
                'rating_avg' => 4.6,
                'poster' => 'posters/parasite.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Inception',
                'genre_id' => 1,
                'tahun' => 2010,
                'sinopsis' => 'Pencuri yang memasuki mimpi orang lain diberi tugas untuk menanamkan ide ke dalam pikiran seorang CEO.',
                'rating_avg' => 4.8,
                'poster' => 'posters/inception.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Oppenheimer',
                'genre_id' => 2,
                'tahun' => 2023,
                'sinopsis' => 'Kisah J. Robert Oppenheimer dan perannya dalam pengembangan bom atom.',
                'rating_avg' => 4.7,
                'poster' => 'posters/oppenheimer.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Dune Part Two',
                'genre_id' => 1,
                'tahun' => 2024,
                'sinopsis' => 'Paul Atreides bersatu dengan Chani dan Fremen untuk membalas dendam.',
                'rating_avg' => 4.5,
                'poster' => 'posters/dune.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'judul' => 'Past Lives',
                'genre_id' => 2,
                'tahun' => 2023,
                'sinopsis' => 'Dua teman masa kecil bertemu kembali di New York setelah berpisah selama dua dekade.',
                'rating_avg' => 4.4,
                'poster' => 'posters/past-lives.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('films')->insert($films);
    }
}