<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'userMail'=>'required|email',
            'userPassword'=>'required',
        ];
    }

    /**
     * @return array
     */
//    public function messages()
//    {
//        return [
//            'required'=>':attribute Không được để trống',
//            'max'=>':attribute Không được quá :max ký tự',
//        ];
//    }

    /**
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator) {
        $listError = [];
        $listError['error'] = $validator->errors()->messages();
        $listError['status'] = 'not_valid';
        throw new HttpResponseException(response()->json($listError, 200));
    }

}
