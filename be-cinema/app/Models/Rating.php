<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    protected $table = 'ratings';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'film_id',
        'nilai',
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