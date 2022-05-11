<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Users extends Authenticatable
{
  use HasFactory, Notifiable, HasApiTokens;
  protected $table = "users";
  protected $fillable = [
    "name",
    "email",
    "password",
    "profile_pic",
    "date_of_birth",
    "id_role"
  ];

  protected $hidden = [
    'password', 'remember_token'
  ];

  public function roles()
  {
    return $this->belongsTo(Roles::class, "id_role");
  }
  
}
