<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolesController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return response(["message" => Roles::all()->pluck("role", "id"), "status" => 200], 200);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $rules = [
      "roleName" => "required"
    ];

    $errorMsgs = [
      "roleName.required" => "(ERROR) We require you to input something"
    ];


    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response($validator->errors()->first(), 400);
    }


    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {
      $roles = new Roles();

      $roles->role = $request->input("roleName");

      if (Roles::where("role", $roles->role)->first() !== null) {
        return response(["message" => $roles->role . " already exists", "status" => 400], 400);
      } else {
        $roles->save();
        return response(["message" => "Success! " . $roles->role . " has been saved to the database!", "status" => 200], 200);
      }
    }
    return response(["message" => "Some error occurred contact admin at support@andresousa.pt", "status" => 401], 401);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function find($id)
  {
    return Roles::find($id) ? response(["message" => Roles::find($id)->pluck("role", "id"), "status" => 200], 200) : response(["message" => "Can't find any role with that id", "status" => 400], 400);
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
      "roleName" => "required|max:30",
    ];

    $errorMsgs = [
      "roleName.max" => "(ERROR) You exceeded the limit of characters for roleName (30)",
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails())
      return response(["message" => $validator->errors()->first(), "status" => 400], 400);

    $role = Roles::find($id);
    if (!$role)
      return response(["message" => "Role with id '" . $id . "' doesn't exist", "status" => 400], 400);

    if ($role->update($request->only("roleName")))
      return response(["message" => "Updated successfully", "status" => 200], 200);

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
    $role = Roles::find($id);
    if (!$role)
      return response(["message" => "Role with id '" . $id . "' doesn't exist", "status" => 400], 400);

    Roles::all()->where("id", "=", $id)->each->delete();
    return response(["message" => "Deleted role with id " . $id, "status" => 200], 200);
  }

  /**
   * Validate a role if it exists
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function valid($id)
  {
    if (Roles::where("id", $id)->first() === null) {
      return response(["message" => false, "status" => 400], 400);
    }

    return response(["message" => true, "status" => 400], 400);
  }
}
