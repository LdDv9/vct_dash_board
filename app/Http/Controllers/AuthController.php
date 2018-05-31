<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function userLogin(LoginRequest $request){
        $data=[
            'email'=>$request->userMail,
            'password'=>$request->userPassword,
        ];
        if(Auth::guard()->attempt($data)){
            return response()->json([
                'status' => 'success'
            ]);

        }else{
            return response()->json([
                'status' => 'error',
                'mess'   => ' Bitch, incorrect email address or password'

            ]);
        }
    }

    public function userLogout () {

        if (Auth::check()) {
            Auth::logout();
            return response()->json([
                'status' => 'success'
            ]);
//            return redirect('/');
        } else {
//            return redirect('/');
            return response()->json([
                'status' => 'error'
            ]);
        }
    }
}
