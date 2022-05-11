<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{

  /*
        PRIVATE CRUD
    */
  /* ================ CREATE ================ */

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   *
   * KEY : VALUE
   * name : value
   * email : value
   * password : value
   * phone : value
   * birthdate : value
   * isEmailVerified : value
   * role_id : value
   *
   */
  public function store(Request $request)
  {
    $rules = [
      "name" => "required|min:5|max:50",
      "email" => "required|min:1|max:100",
      "password" => "required|min:10|max:30",
      "date_of_birth" => "required|date_format:Y-m-d"
    ];

    $errorMsgs = [
      "name.min" => "(ERROR) You need to put at least 5 characters for name",
      "name.max" => "(ERROR) You exceeded the limit of characters for name (50)",
      "email.min" => "(ERROR) You need to put at least 1 characters for email",
      "email.max" => "(ERROR) You exceeded the limit of characters for email (100)",
      "password.min" => "(ERROR) You need to put at least 10 characters for password",
      "password.max" => "(ERROR) You exceeded the limit of characters for password (30)",
      "date_of_birth.date_format" => "(ERROR) The format for the date is Y-m-d",
      "name.required" => "(ERROR) name is required",
      "email.required" => "(ERROR) email is required",
      "password.required" => "(ERROR) password is required",
      "date_of_birth.required" => "(ERROR) date_of_birth is required"
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response(["message" => $validator->errors()->first(), "status" => 400], 400);
    }

    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {

      // unique phone
      $user = Users::firstOrNew(
        [
          "email" => $request->input("email")
        ]
      );

      $user->name = $request->input("name");
      $user->email = $request->input("email");
      $user->password = Hash::make($request->input("password"));
      $user->date_of_birth =  date("Y-m-d", strtotime($request->input("date_of_birth")));
      $user->id_role = 1;

      if (Roles::find($user->id_role)) {
        if (!$user->exists) {
          $user->save();
          if ($request->hasFile('profile_pic')) {
            $path = $request->file('profile_pic')->store('uploads/profile_pic/' . $user->id);
            $user->profile_pic = $path;
            Storage::disk('public')->put("profile_pic/" . $user->id, $request->file('profile_pic'));
            $user->save();
          }
          return response(["message" => "Account has been created", "status" => 201], 201);
        } else {
          return response(["message" => "Can't create a user cause it already exists", "status" => 400], 400);
        }
      } else {
        return response(["message" => "That role doesn't exist!", "status" => 400], 400);
      }
    }

    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }

  /* ================ READ ================ */

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    if (Auth::check())
      return response(["users" => Users::all()->makeHidden("password"), "status" => 200], 200);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function find($id)
  {
    return Users::find($id) ? response(["user" => Users::find($id)->makeHidden("password"), "status" => 200], 200) : response(["message" => "Can't find any user with that id ", "status" => 400], 400);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $rules = [
      "name" => "max:50",
      "email" => "max:100",
      "password" => "min:10|max:30",
      "date_of_birth" => "date_format:Y-m-d",
      "profile_pic" => "image|mimes:jpeg,png,jpg,gif,svg|max:10240",
      "id_role" => "min:1|max:10",
    ];

    $errorMsgs = [
      "name.max" => "(ERROR) You exceeded the limit of characters for name (50)",
      "email.max" => "(ERROR) You exceeded the limit of characters for email (100)",
      "password.min" => "(ERROR) You need to put at least 10 characters for password",
      "password.max" => "(ERROR) You exceeded the limit of characters for password (30)",
      "date_of_birth.date_format" => "(ERROR) The format for the date is Y-m-d",
      "profile_pic.image" => "(ERROR) We require you to input a image",
      "profile_pic.mimes" => "(ERROR) We require you to input a image that is jpeg, png, jpg, gif or svg",
      "profile_pic.max" => "(ERROR) You exceeded the limit of image size (10MB)",
      "id_role.min" => "(ERROR) You need to put at least 1 number for the role id",
      "id_role.max" => "(ERROR) You exceeded the limit of numbers for role (10)"
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails())
      return response(["message" => $validator->errors()->first(), "status" => 400], 400);

    $user = Users::find($id);
    if (!$user)
      return response(["message" => "User with id '" . $id . "' doesn't exist", "status" => 400], 400);

    try {
      if ($request->has("password")) {
        $user->password = Hash::make($request->input("password"));
        $user->save();
      }
      if ($request->has("name")) {
        $user->name = $request->input("name");
        $user->save();
      }
      if ($request->has("email")) {
        $users = Users::where('email', '=', $request->input('email'))->first();
        if ($users === null) {
          $user->email = $request->input("email");
          $user->save();
        } else {
          if ($users->name === $user->name) {

            $user->email = $request->input("email");
            $user->save();
          } else {
            return response(["message" => "That email already exists", "status" => 400], 400);
          }
        }
      }
      if ($request->has("email")) {
        $user->date_of_birth =  date("Y-m-d", strtotime($request->input("date_of_birth")));
        $user->save();
      }
      if ($request->has("id_role")) {
        $roleId = $request->input("id_role");
        $role = Roles::find($roleId);
        if (!$role)
          return response(["message" => "Role with id '" . $roleId . "' doesn't exist", "status" => 400], 400);

        $user->id_role =  $request->input("id_role");
        $user->save();
      }

      if ($request->hasFile('profile_pic')) {
        Storage::disk('public')->delete(str_replace("uploads/", "", $user->profile_pic));
        $path = $request->file('profile_pic')->store('uploads/profile_pic/' . $user->id);
        $user->profile_pic = $path;
        Storage::disk('public')->put("profile_pic/" . $user->id, $request->file('profile_pic'));
        $user->save();
      }
      return response(["message" => "Updated successfully", "status" => 200], 200);
    } catch (\Throwable $th) {
      return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
    }



    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }


  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function updateRole(Request $request, $id)
  {
    $rules = [
      "id_role" => "required|min:1|max:10",
    ];

    $errorMsgs = [
      "id_role.min" => "(ERROR) You need to put at least 1 number for the role id",
      "id_role.max" => "(ERROR) You exceeded the limit of numbers for role (10)"
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails())
      return response(["message" => $validator->errors()->first(), "status" => 400], 400);

    $user = Users::find($id);
    if (!$user)
      return response(["message" => "User with id '" . $id . "' doesn't exist", "status" => 400], 400);

    $roleId = $request->input("id_role");
    $role = Roles::find($roleId);
    if (!$role)
      return response(["message" => "Role with id '" . $roleId . "' doesn't exist", "status" => 400], 400);

    if ($user->update($request->only("id_role"))) {
      return response(["message" => "Updated successfully", "status" => 200], 200);
    }

    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $user = Users::find($id);
    if (!$user)
      return response(["message" => "User with id '" . $id . "' doesn't exist", "status" => 400], 400);

    Users::all()->where("id", "=", $id)->each->delete();
    return response(["message" => "Deleted user with id " . $id, "status" => 200], 200);
  }

  /**
   * Return the role of the user.
   *
   * @param  int  $id
   */
  public function role($id)
  {
    $user = Users::find($id);
    $role = "";
    if ($user) {
      return response($user->roles->role, 200);
    }

    return response(["message" => "Couldn't find any role on that user please specify a valid user id.", "status" => 400], 400);
  }

  /**
   * Return if the user id is valid
   *
   * @param  int  $id
   */
  public function valid($id)
  {
    return Users::find($id) ? response(["message" => "User found", "status" => 200], 200) : response(["message" => "Can't find a user with that id", "status" => 400], 400);
  }

  /*
        PUBLIC CRUD
    */

  public function myInfo()
  {
    $id = Auth::user()->id;
    return response(["user" => Users::find($id)->makeHidden(["password", "id_role"]), "status" => 200], 200);
  }

  public function changeMyName(Request $request)
  {
    $rules = [
      "name" => "required|min:5|max:50",
    ];

    $errorMsgs = [
      "name.min" => "(ERROR) You need to put at least 5 characters for name",
      "name.max" => "(ERROR) You exceeded the limit of characters for name (50)",
      "name.required" => "(ERROR) We require you to input something",
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response($validator->errors()->first(), 400);
    }

    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {
      $id = Auth::user()->id;
      $user = Users::find($id);
      $user->name = $request->input("name");
      if ($user->save()) {
        return response(["message" => "Changes have been made to your name", "status" => 200], 200);
      }
    }
    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }

  public function changeMyEmail(Request $request)
  {
    $rules = [
      "email" => "required|max:100",
    ];

    $errorMsgs = [
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
      $id = Auth::user()->id;
      $user = Users::find($id);
      $user->email = $request->input("email");
      if ($user->save()) {
        return response(["message" => "Changes have been made to your email", "status" => 200], 200);
      }
    }
    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }

  public function changeMyPassword(Request $request)
  {
    $rules = [
      "password" => "required|min:10|max:30",
      "newPassword" => "required|min:10|max:30",
    ];

    $errorMsgs = [
      "password.min" => "(ERROR) You need to put at least 10 characters for oldPassword",
      "password.max" => "(ERROR) You exceeded the limit of characters for oldPassword (30)",
      "password.required" => "(ERROR) We require you to input something",
      "newPassword.min" => "(ERROR) You need to put at least 10 characters for newPassword",
      "newPassword.max" => "(ERROR) You exceeded the limit of characters for newPassword (30)",
      "newPassword.required" => "(ERROR) We require you to input something"
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response($validator->errors()->first(), 400);
    }

    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {
      $id = Auth::user()->id;
      $user = Users::find($id);
      if (Hash::check($request->password, $user->password)) {
        $user->password = Hash::make($request->input("newPassword"));
        if ($user->save()) {
          return response(["message" => "Changes have been made to your password", "status" => 200], 200);
        }
      } else {
        return response(["message" => "Password doesn't match", "status" => 400], 400);
      }
    }
    return response(["message" => "Some error occurred contact admin at support@andresousa.pt ", "status" => 401], 401);
  }

  public function changeMyDOB(Request $request)
  {
    $rules = [
      "date_of_birth" => "required|date_format:Y-m-d",
    ];

    $errorMsgs = [
      "date_of_birth.date_format" => "(ERROR) The format for the date is Y-m-d",
      "date_of_birth.required" => "(ERROR) date_of_birth is required",
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response($validator->errors()->first(), 400);
    }

    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {
      $id = Auth::user()->id;
      $user = Users::find($id);
      $user->date_of_birth = $request->input("date_of_birth");
      if ($user->save()) {
        return response(["message" => "Changes have been made to your date of birth", "status" => 200], 200);
      }
    }
    return response(["message" => "Some error occurred contact admin at support@andresousa.pt ", "status" => 401], 401);
  }

  public function changeMyImage(Request $request)
  {
    $rules = [
      "profile_pic" => "image|mimes:jpeg,png,jpg,gif,svg|max:10240"
    ];

    $errorMsgs = [
      "profile_pic.image" => "(ERROR) We require you to input a image",
      "profile_pic.mimes" => "(ERROR) We require you to input a image that is jpeg, png, jpg, gif or svg",
      "profile_pic.max" => "(ERROR) You exceeded the limit of image size (10MB)",
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails())
      return response(["message" => $validator->errors()->first(), "status" => 400], 400);

    $id = Auth::user()->id;
    $user = Users::find($id);
    if ($request->hasFile('profile_pic')) {
      Storage::disk('public')->delete(str_replace("uploads/", "", $user->profile_pic));
      $path = $request->file('profile_pic')->store('uploads/profile_pic/' . $user->id);
      $user->profile_pic = $path;
      Storage::disk('public')->put("profile_pic/" . $user->id, $request->file('profile_pic'));
      $user->save();
    }

    if ($user->save()) {
      return response(["message" => "Changes have been made to your profile picture", "path" => $user->profile_pic . "", "status" => 200], 200);
    }

    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }
}
