<?php
use Illuminate\Support\Facades\Route;
//use Symfony\Component\Routing\Route;
Route::group(['prefix' => 'api'], function () {
    Route::resource('users', 'UserController');
    Route::resource('guest', 'GuestController');
});
Route::get('/',function () {
   return view('welcome');
});
Route::view('/{any}', 'welcome')
    ->where('any', '.*');