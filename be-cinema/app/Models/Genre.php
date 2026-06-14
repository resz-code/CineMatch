<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    protected $table = 'genres';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nama',
    ];

    /**
     * One-to-Many: Satu genre memiliki banyak film
     */
    public function films()
    {
        return $this->hasMany(Film::class, 'genre_id', 'id');
    }

    /**
     * Many-to-Many: Satu genre disukai oleh banyak user (Preferensi)
     */
    public function interestedUsers()
    {
        return $this->belongsToMany(User::class, 'user_genres', 'genre_id', 'user_id');
    }
}