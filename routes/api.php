<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('users', 'UserController');
Route::resource('guest', 'GuestController');
Route::group(['prefix' => 'dash-board'], function () {
    Route::post('/user-register', 'RegisterController');
//    Route::post('user-login','AuthController@userLogin');
//    Route::match(['get', 'post'], 'user-login', 'AuthController@userLogin');
});
Route::post('/user-login', 'AuthController@userLogin');