<?php
use Illuminate\Support\Facades\Route;
//use Symfony\Component\Routing\Route;

Route::get('/','PageController@indexPage');
Route::get('/dash-board','PageController@dashBoardPage')->middleware('checkAuth');
Route::group(['prefix' => 'dash-board'], function () {
    Route::get('/users/create',function (){
        return view('user/create-user');
    });
});
//Route::view('/{any}', 'dash_board')
//    ->where('any', '.*');
Route::post('/api/user-login', 'AuthController@userLogin');
Route::post('/api/dash-board/user-logout','AuthController@userLogout');

