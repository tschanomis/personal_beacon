<?php

use Illuminate\Database\Seeder;
use App\User;
use Carbon\Carbon;

class AdminSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $input['email'] = 'admin@admin.com';
    $input['name'] = 'admin';
    $input['password'] = bcrypt('admin');
    $user = User::create($input);
    $success['token'] =  $user->createToken('MyApp')->accessToken;
    $success['name'] =  $user->name;
  }
}
