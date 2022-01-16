<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;
class RoleController extends Controller
{
// function __construct()
// {
// $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index','store']]);
// $this->middleware('permission:role-create', ['only' => ['create','store']]);
// $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
// $this->middleware('permission:role-delete', ['only' => ['destroy']]);
// }
public function index(Request $request)
{
$roles = Role::with('permissions')->OrderByDesc('id')->get();
return response($roles, 200);
}

public function store(Request $request)
{
// $this->validate($request, [
// 'name' => 'required|unique:roles,name',
// 'permissions' => 'required'
// ]);
$role = Role::create(['name' => $request->input('name')]);
$role->syncPermissions($request->input('permissions'));
return response()->json($role, 201);
}
public function show($id)
    {
    $role = Role::find($id);
    return response()->json($role, 200);
    }

public function update(Request $request, $id)
{
$this->validate($request, [
'name' => 'required|unique:roles,name,'.$id,
'permissions' => 'required',
]);
$role = Role::find($id);
$role->name = $request->input('name');
$role->save();
$role->syncPermissions($request->input('permissions'));
return response()->json($role, 200);

}
public function destroy($id)
{
    Role::where('id',$id)->delete();
return response()->json(null,204);
}
}