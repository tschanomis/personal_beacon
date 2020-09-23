<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class LogSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    DB::table('logs')->insert([
      'created_at' => Carbon::now()->subDays(rand(1, 7)),
      'places_id' => rand(1, 30)
    ]);
  }
}
