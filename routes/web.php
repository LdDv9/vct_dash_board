<?php
use Illuminate\Support\Facades\Route;
//use Symfony\Component\Routing\Route;

Route::get('/',function () {
   return view('index');
});
Route::get('/dash-board',function () {
    return view('dash_board');
});
Route::view('/{any}', 'index')
    ->where('any', '.*');
