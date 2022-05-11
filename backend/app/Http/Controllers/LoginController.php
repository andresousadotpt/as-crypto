<?php

namespace App\Http\Controllers;

use GuzzleHttp\Psr7\Header;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Passport;
use Illuminate\Support\Carbon;

class LoginController extends Controller
{
  //
  public function login(Request $request)
  {

    $rules = [
      "email" => "required|min:1|max:100",
      "password" => "required|min:10|max:30"
    ];

    $errorMsgs = [
      "password.min" => "(ERROR) You need to put at least 10 characters for password",
      "password.max" => "(ERROR) You exceeded the limit of characters for password (30)",
      "password.required" => "(ERROR) We require you to input something",
      "email.min" => "(ERROR) You need to put at least 1 characters for email",
      "email.max" => "(ERROR) You exceeded the limit of characters for email (100)",
      "email.required" => "(ERROR) email is required",
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response($validator->errors()->first(), 400);
    }

    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {
      if (!Auth::attempt(['email' => $request->input("email"), 'password' => $request->input("password")])) {
        return response(["message" => "Email or password incorrect contact support@andresousa.pt if the error persists", "status" => 400], 400);
      }

      //gives error but works, intelephense is being retarded here
      $accessToken = Auth::user()->createToken("authToken")->accessToken;

      return response(["access_token" => $accessToken, "name" => Auth::user()->name, "email" => Auth::user()->email, "profile_pic" => Auth::user()->profile_pic, "status" => 201], 201);
    }
  }

  public function isLogin()
  {
    if (Auth::check()) {
      return response(["message" => "Logged in", "role" => Auth::user()->roles->role, "status" => 201], 201);
    }

    return response(["message" => "Contact support@andresousa.pt if the error persists", "status" => 400], 400);
  }
}
