<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTExceptions;

class UserController extends Controller
{
    public function register (Request $request)
    {
        $user=User::where('email',$request['email'])->first();
        if($user){
            $response['status']=0;
            $response['message']='Email Already Exists';
            $response['code']=409;
        }else{
            $input = $request->all();
        $input['password'] = bcrypt($request['password']);
        $user = User::create($input);
        $user->assignRole('administrator');
            
            $response['status']=1;
            $response['message']='User Registered Successfully';
            $response['code']=200;

        }
        
        return response()->json($response);
    }
    public function login(Request $request){
        $credentials=$request->only('email','password');
        try{
            if(!JWTAuth::attempt($credentials)){
                $response['status']=0;
                $response['code']=401;
                $response['data']=null;
                $response['message']='Email or Password is incorrect';
                return response()->json($response);
            }

        }catch(JWTException $e){
            $response['data']=null;
            $response['code']=500;
            $response['message']='cloud Not Create Token';
            return response()->json($response);

        }
        $user=auth()->user();
        $data['token']=auth()->claims([
            'user_id' => $user->id,
            'email' => $user->email

        ])->attempt($credentials);

                $response['data']=$data;
                $response['status']=1;
                $response['code']=200;
                $response['message']='Login Successfully';
                return response()->json($response);
    }
    public function show($id)
    {
    $user = User::find($id)->with('roles')->get();
    return response()->json($user, 200);
    }
    public function index(){

        $users= User::with('roles')->OrderByDesc('id')->get();
        return response()->json($users, 200);
    }
    public function store(Request $request){
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'roles' => 'required'
            ]);
        $input = $request->all();
        $input['password'] = bcrypt($request['password']);
        $user = User::create($input);
        $user->assignRole($request->input('roles'));
        
        return response()->json($user, 201);
  
      }
      public function update(Request $request,$id){
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'required',
            'roles' => 'required'
            ]);
        $user=User::find($id);
        if(is_null($user)){
          return response()->json(['message'=>'User Not Found'],404);
        }
        $input = $request->all();
        $input['password'] = bcrypt($request['password']);
        $user->update($input);
        $roles=$request->input('roles');
        $user->syncRoles($roles);
        return response()->json($user, 200);
  
      }
      public function destroy($id){
            $user=User::find($id);
              if(is_null($user)){
                return response()->json(['message'=>'User Not Found'],404);
              }
              $user->delete();
              return response()->json(null,204);
            }
     public function isAdmin($id){
          $user=User::find($id);
          if(is_null($user)){
                return response()->json(['message'=>'User Not Found'],404);
              }
        else{ 
            return response()->json($user->hasRole('administrator'));
           
            }

         
     }
}
