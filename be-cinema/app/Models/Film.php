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
        'rating_default',
        'is_active',
    ];

    public function getPosterAttribute($value)
    {
        if ($value) {
            return asset('storage/' . $value);
        }
        return null; 
    }

    public function interactingUsers()
    {
        return $this->belongsToMany(User::class, 'film_user')
                    ->withPivot('is_watched', 'rating')
                    ->withTimestamps();
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'film_genre');
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'film_id', 'id');
    }

    public function watchHistories()
    {
        return $this->hasMany(History::class, 'film_id', 'id');
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class, 'film_id', 'id');
    }
}