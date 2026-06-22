<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $table = 'films';
    protected $primaryKey = 'id';

    protected $fillable = [
        'judul',
        'genre_id',
        'tahun',
        'sinopsis',
        'poster',
        'rating_avg',
    ];

    public function getPosterAttribute($value)
    {
        if ($value) {
            return asset('storage/' . $value);
        }
        return null; // Jika poster kosong
    }

    /**
     * BelongsTo: Film terikat pada satu genre
     */
    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'id');
    }

    /**
     * One-to-Many: Film memiliki banyak catatan rating dari user
     */
    public function ratings()
    {
        return $this->hasMany(Rating::class, 'film_id', 'id');
    }

    /**
     * One-to-Many: Film muncul di banyak histori tontonan
     */
    public function watchHistories()
    {
        return $this->hasMany(History::class, 'film_id', 'id');
    }

    /**
     * One-to-Many: Film bisa direkomendasikan ke banyak user
     */
    public function recommendations()
    {
        return $this->hasMany(Recommendation::class, 'film_id', 'id');
    }
}