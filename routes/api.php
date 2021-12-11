<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CalendarsController;
use App\Http\Controllers\EventsController;


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'authenticate']);
// Route::get('open', [DataController::class, 'open']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', [UserController::class, 'getAuthenticatedUser']);
    Route::post('calendars', [CalendarsController::class, 'create']);
    Route::get('calendars', [CalendarsController::class, 'getMy']);
    Route::get('calendars/{id}', [CalendarsController::class, 'getById']);

    Route::post('events', [EventsController::class, 'create']);
    Route::get('events', [EventsController::class, 'getMy']);
    // Route::get('closed', [DataController::class, 'closed']);
});

// TODO Holidays API
