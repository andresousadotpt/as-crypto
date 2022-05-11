<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostsController;
use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//USERS
//RATE LIMIT
Route::group(['middleware' => ["throttle:60, 1", "cors"]], function () {
  Route::prefix("/user")->group(function () {
    // PUBLIC: api/v1/user/create - POST a user
    /*
         * name : value, email : value, password : value, date_of_birth : value
         */
    Route::post("/create", [UsersController::class, "store"]);
    Route::post("/login", [LoginController::class, "login"]);
    Route::group(['middleware' => ["auth:api", "cors"]], function () {
      Route::get("/isLogin", [LoginController::class, "isLogin"]);
      // PUBLIC: api/v1/user/myinfos - GET the users infos (own info)
      Route::get("/myinfo", [UsersController::class, "myInfo"]);
      /*
                WHEN CHANING USER INFO IN FRONTEND JUST LIKE REMOVE THE TOKEN FROM CACHE
            */
      // PUBLIC: api/v1/user/changeMyEmail - POST to change user email
      Route::post("/changemyname", [UsersController::class, "changeMyName"]);
      Route::post("/changemyemail", [UsersController::class, "changeMyEmail"]);
      // PUBLIC: api/v1/user/changeMyPassword - POST to change user email
      Route::post("/changemypassword", [UsersController::class, "changeMyPassword"]);
      // PUBLIC: api/v1/user/changemydob - POST to change user Date of Birth
      Route::post("/changemydob", [UsersController::class, "changeMyDOB"]);
      // PUBLIC: api/v1/user/changemydob - POST to change user Date of Birth
      Route::post("/changemyprofilepic", [UsersController::class, "changeMyImage"]);

      Route::group(['middleware' => ["role:Administrator,Social Media Engineer,Moderator", "cors"]], function () {
        // PRIVATE: api/v1/user/all - GET all users
        Route::get("/all", [UsersController::class, "index"]);
        // PRIVATE: api/v1/user/{id} - GET a specific user
        Route::get("/{id}", [UsersController::class, "find"]);
        // PRIVATE: api/v1/user/{id}/role/ - GET role of a specific user from its id
        Route::get("/{id}/role", [UsersController::class, "role"]);
        // PRIVATE: api/v1/user/{id}/valid/ - GET if the user is valid
        Route::get("{id}/valid", [UsersController::class, "valid"]);
        // PRIVATE: api/user/{id} - UPDATE the user
        /*
                 * name : value, email : value, password : value, profile_pic : image phone : value, date_of_birth : value, address : value
                 */
        Route::post("/{id}", [UsersController::class, "update"]);
        // PRIVATE: api/v1/user/{id} - UPDATE the user role
        /*
                 * roleId : value
                 */
        Route::put("/{id}/role", [UsersController::class, "updateRole"]);
        // PRIVATE: api/roles/{id} - DELETE the user
        Route::delete("/{id}", [UsersController::class, "destroy"]);
      });
    });
  });
});




//ROLES
Route::group(['middleware' => ["throttle:60, 1", "cors"]], function () {
  Route::prefix('/role')->group(function () {
    Route::group(['middleware' => ["auth:api", "cors"]], function () {
      Route::group(['middleware' => ["role:Administrator,Social Media Engineer,Moderator", "cors"]], function () {
        // PRIVATE: api/roles/create - POST a role
        /*
            * roleName : value
            */
        Route::post("/create", [RolesController::class, "store"]);
        // PRIVATE: api/roles - GET all roles
        Route::get("/all", [RolesController::class, "index"]);
        // PRIVATE: api/roles/{id} - GET the role name of a specific id
        Route::get("/{id}", [RolesController::class, "find"]);
        // PRIVATE: api/roles/{id} - UPDATE the role// Send with KEY:VALUE
        /*
             * roleName : value
             */
        Route::put("/{id}", [RolesController::class, "update"]);
        // PRIVATE: api/roles/{id} - DELETE the role
        Route::delete("/{id}", [RolesController::class, "destroy"]);
      });
    });
  });
});

//POSTS
Route::group(['middleware' => ["throttle:60, 1", "cors"]], function () {
  Route::prefix('/posts')->group(function () {
    Route::group(['middleware' => ["auth:api", "cors"]], function () {
      Route::group(['middleware' => ["role:Administrator,Social Media Engineer,Moderator", "cors"]], function () {
        // PRIVATE: api/v1/posts/create - POST a post
        /*
            * text : value
            * image : value
            */
        Route::post("/create", [PostsController::class, "store"]);
        // PRIVATE: api/v1/posts/{id} - GET the posts info of a specific id
        Route::get("/{id}", [PostsController::class, "find"]);
        // PRIVATE: api/v1/posts/{id} - UPDATE the posts
        /*
             * text : value
             * image : value
             */
        Route::post("/{id}", [PostsController::class, "update"]);
        // PRIVATE: api/v1/posts/{id} - DELETE the role
        Route::delete("/{id}", [PostsController::class, "destroy"]);
      });
    });
  });
});
