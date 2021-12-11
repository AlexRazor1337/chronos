<?php

namespace App\Http\Controllers;

use App\Models\Calendar;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CalendarsController extends Controller {
    public function create(Request $request) {
            $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:128',
            'description' => 'required|string|max:255'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = JWTAuth::user();
        $calendar = Calendar::create([
            'name' => $request->get('name'),
            'description' => $request->get('description'),
            'color' => $request->get('color', 'gray'),
            'user_id' => $user->id
        ]);

        return response()->json(compact('calendar'), 201);
    }

    public function getMy(Request $request) {
        $user = JWTAuth::user();
        return Calendar::where('user_id', $user->id)->get();
    }

    public function getById($id) {
        $calendar = Calendar::find($id);
        $user = JWTAuth::user();
        if ($user->id == $calendar->user_id) return Calendar::find($id);
        return response()->json(["message" => "You don't have access"], 403);
    }
}
