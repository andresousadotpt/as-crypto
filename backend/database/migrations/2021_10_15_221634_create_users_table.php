<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string("name");
            $table->string("email");
            $table->string("password");
            $table->string("profile_pic")->nullable();
            $table->date("date_of_birth");
            $table->unsignedBigInteger("id_role");
            $table->timestamps();
        });

        
        Schema::table('users', function (Blueprint $table) {
            $table->foreign("id_role")->references("id")->on("roles");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
