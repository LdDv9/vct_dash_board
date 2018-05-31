<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    public function indexPage(){
        if (Auth::check()) {
            return redirect('/dash-board');

        } else {
            return view('index');
        }
    }
    public function dashBoardPage(){
        return view('dash_board');
    }
}
