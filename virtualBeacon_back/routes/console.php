<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('db:init', function () {
    Artisan::call('migrate:refresh');
    Artisan::call('passport:install');
    Artisan::call('db:seed --class=AdminSeeder');
    $this->comment('db init done');
})->describe('db init');

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->describe('Display an inspiring quote');
