<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Event;

class Calendar extends Model {
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'color', 'hidden'
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'color' => 'string',
        'hidden' => 'boolean'
    ];

    public function events() { return $this->hasMany(Event::class); }
}
