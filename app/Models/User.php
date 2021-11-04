<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject {
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'email' => 'string',
        'password' => 'string',
    ];

    protected $hidden = [
        'password', 'remember_token', 'email_verified_at'
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }
}
