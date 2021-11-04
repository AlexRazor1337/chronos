<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model {
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'color', 'hidden'
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'date' => 'datetime',
        'duration' => 'integer',
        'calendar_id' => 'integer',
        'category' => 'string'
    ];
}
