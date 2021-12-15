<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model {
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'date', 'category', 'duration', 'calendar_id', 'user_id'
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'date' => 'string',
        'duration' => 'integer',
        'calendar_id' => 'integer',
        'category' => 'string'
    ];
}
