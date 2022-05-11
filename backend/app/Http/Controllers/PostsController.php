<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return response(["message" => Posts::all()->pluck("text", "user_id"), "status" => 200], 200);
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
      "text" => "required|max:500",
      "image" => "image|mimes:jpeg,png,jpg,gif,svg|max:10240",
    ];

    $errorMsgs = [
      "text.required" => "(ERROR) We require you to input something",
      "text.max" => "(ERROR) You exceeded the limit of characters for text (500)",
      "image.image" => "(ERROR) We require you to input a image",
      "image.mimes" => "(ERROR) We require you to input a image that is jpeg, png, jpg, gif or svg",
      "image.max" => "(ERROR) You exceeded the limit of image size (10MB)",
    ];


    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails()) {
      return response($validator->errors()->first(), 400);
    }


    // Retrieve the validated input...
    $validated = $validator->validated();
    if ($validated) {
      $post = new Posts();
      $post->text = $request->input("text");
      $post->user_id = Auth::user()->id;
      if ($request->hasFile('image')) {
        // if you wanna remove the file that has been used before Storage::disk('public')->delete(str_replace("uploads/", "", $user->profile_pic));
        $path = $request->file('image')->store('uploads/posts/user_' . $post->user_id);
        $post->image = $path;
        Storage::disk('public')->put("posts/user_" . $post->user_id, $request->file('image'));
        $post->save();
      }
      $post->save();

      return response(["message" => "You created a post successfully ", "post_image_url" => "/" . $post->image, "status" => 200], 200);
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
    return Posts::find($id) ? response(["text" => Posts::find($id)->text, "image" => Posts::find($id)->image, "status" => 200], 200) : response(["message" => "Can't find any post with that id", "status" => 400], 400);
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
      "text" => "required|max:500",
      "image" => "image|mimes:jpeg,png,jpg,gif,svg|max:10240",
    ];

    $errorMsgs = [
      "text.required" => "(ERROR) We require you to input something",
      "text.max" => "(ERROR) You exceeded the limit of characters for text (500)",
      "image.image" => "(ERROR) We require you to input a image",
      "image.mimes" => "(ERROR) We require you to input a image that is jpeg, png, jpg, gif or svg",
      "image.max" => "(ERROR) You exceeded the limit of image size (10MB)",
    ];

    $validator = Validator::make($request->all(), $rules, $errorMsgs);

    if ($validator->fails())
      return response(["message" => $validator->errors()->first(), "status" => 400], 400);

    $post = Posts::find($id);
    if (!$post)
      return response(["message" => "Post with id '" . $id . "' doesn't exist", "status" => 400], 400);

    if ($post->update($request->only("text"))) {
      $post->text = $request->input("text");

      if ($request->hasFile('image')) {
        Storage::disk('public')->delete(str_replace("uploads/", "", $post->image));
        $path = $request->file('image')->store('uploads/posts/user_' . $post->user_id);
        $post->image = $path;
        Storage::disk('public')->put("posts/user_" . $post->user_id, $request->file('image'));
        $post->save();
      }

      $post->save();

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
    $post = Posts::find($id);
    if (!$post)
      return response(["message" => "Post with id '" . $id . "' doesn't exist", "status" => 400], 400);

    Posts::all()->where("id", "=", $id)->each->delete();
    Storage::disk('public')->delete(str_replace("uploads/", "", $post->image));
    return response(["message" => "Deleted post with id " . $id, "status" => 200], 200);
  }
}
