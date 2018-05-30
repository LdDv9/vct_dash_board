<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function indexPage(){
        dd(Auth::user());
        return view('index');
    }
}
