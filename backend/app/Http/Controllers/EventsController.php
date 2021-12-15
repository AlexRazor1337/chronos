<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class EventsController extends Controller  {
    public function create(Request $request) {
            $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:128',
            'date' => 'required|string',
            'calendar_id' => 'required|integer',
            'category' => 'in:arrangement,reminder,task',
            'duration' => 'integer'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = JWTAuth::user();
        $calendar = Calendar::where('user_id', $user->id)->where('id', $request->calendar_id)->get();
        
        $event = Event::create([
            'name' => $request->get('name'),
            'date' => $request->get('date'),
            'calendar_id' => $request->get('calendar_id'),
            'category' => $request->get('category', 'task'),
            'duration' => $request->get('duration'),
            'user_id' => $user->id
        ]);

        return response()->json(compact('event'), 201);
    }

    public function getMy(Request $request) {
        $user = JWTAuth::user();
        return Event::where('user_id', $user->id)->get();
    }

    public function getById($id) {
        $calendar = Calendar::find($id);
        if (!$calendar) {
            return response()->json(["message" => "Calendar not found!"], 404);
        }

        $user = JWTAuth::user();
        if ($user->id == $calendar->user_id) return response()->json(Event::where('calendar_id', $calendar->id)->get());
        return response()->json(["message" => "You don't have access"], 403);       
    }
}
