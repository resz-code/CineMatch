<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserGenre extends Pivot
{
    protected $table = 'user_genres';

    public $incrementing = true;
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'genre_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'id');
    }
}