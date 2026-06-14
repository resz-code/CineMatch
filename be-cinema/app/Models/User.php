<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    public function preferredGenres() 
    {
        return $this->belongsToMany(Genre::class, 'user_genres', 'user_id', 'genre_id');
    }

    public function ratings() 
    {
        return $this->hasMany(Rating::class);
    }

    public function watchHistories() 
    {
        return $this->hasMany(History::class);
    }

    public function recommendations() 
    {
        return $this->hasMany(Recommendation::class);
    }
}