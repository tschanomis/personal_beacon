<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ControllerTest;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'LoginController@login');
Route::post('/password/email', 'ForgotPasswordControllerCustom@sendResetLinkEmail');
Route::post('/password/reset', 'ResetPasswordController@reset');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/logs', 'ControllerLogs@getLogs');

    Route::get('/details', 'LoginController@details');

    Route::post('/user/create', 'LoginController@register');

    Route::get('/places', 'ControllerPlaces@allPlaces');
    Route::get('/places/{id}', 'ControllerPlaces@byId');
    Route::post('/places/position', 'ControllerPlaces@byPosition');
    Route::post('/places/create/position', 'ControllerPlaces@createPosition');
    Route::put('/places/position', 'ControllerPlaces@modifyPosition');
    Route::delete('/places/delete/{id}', 'ControllerPlaces@deletePosition');
});
