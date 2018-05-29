<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function userLogin(LoginRequest $request){
        $data=[
            'email'=>$request->userMail,
            'password'=>$request->userPassword,
        ];
        if(Auth::attempt($data)){
            return response()->json([
                'status' => 'success'
            ]);
        }else{
            return response()->json([
                'status' => 'error',
                'mess'   => 'Incorrect email address or password'

            ]);
        }
    }
}
