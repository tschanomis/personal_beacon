<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;

class LoginController extends Controller
{
	public $successStatus = 200;
	/** 
	 * login api 
	 * 
	 * @return \Illuminate\Http\Response 
	 */
	public function login()
	{
		if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
			$user = Auth::user();
			$success['token'] =  $user->createToken('MyApp')->accessToken;
			return response()->json(['success' => $success, 'message' => 'Bienvenue'], $this->successStatus);
		} else {
			return response()->json(['error' => 'Unauthorised'], 401);
		}
	}

	/** 
	 * details api 
	 * 
	 * @return \Illuminate\Http\Response 
	 */
	public function details()
	{
		$user = Auth::user();
		return response()->json(['success' => $user], $this->successStatus);
	}

	public function register(Request $request)
	{
		$user = Auth::user();
		$user_name = $user->name;

		if ($user_name === "admin") {
			$input = $request->all();
			$input['password'] = bcrypt($input['password']);
			$user = User::create($input);
			$success['token'] =  $user->createToken('MyApp')->accessToken;
			$success['name'] =  $user->name;
			return response()->json([$success, 'User register successfully.'], 201);
		} else {
			return response()->json(['Error' => 'Non autorisé'], 401);
		}
	}
}
