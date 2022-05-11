<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string("role");
            $table->timestamps();
        });

        DB::table('roles')->insert([
            [
                'role' => 'Membro'
            ],
            [
                'role' => 'Social Media Engineer'
            ],
            [
                'role' => 'Moderator'
            ],
            [
                'role' => 'Administrator'
            ]
        ]
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
