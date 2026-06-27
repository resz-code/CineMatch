<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $table = 'watch_histories';
    protected $primaryKey = 'id';

    // Karena di migration kita menggunakan watched_at (tanpa created_at & updated_at bawaan Laravel)
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'film_id',
        'watched_at',
    ];

    // Mengatur agar watched_at otomatis dibaca sebagai objek Carbon/Datetime
    protected $casts = [
        'watched_at' => 'datetime',
    ];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function film()
    {
        return $this->belongsTo(Film::class, 'film_id', 'id');
    }
}