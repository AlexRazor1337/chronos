<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Event;

class Calendar extends Model {
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'color', 'user_id'
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'color' => 'string'
    ];

    public function events() { return $this->hasMany(Event::class); }
}
