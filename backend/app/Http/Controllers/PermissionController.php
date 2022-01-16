<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use DB;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $permissions = permission::OrderByDesc('id')->get();
        return response()->json($permissions, 200);
    }
    public function show($id)
    {
        $permission = Permission::find($id);
        return response()->json($permission, 200);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:permissions,name'
        ]);
        $permission = Permission::create($request->all());

        return response()->json($permission, 201);
    }


    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required|unique:permissions,name,' . $id,
        ]);
        $permission = Permission::find($id);
        $permission->name = $request->input('name');
        $permission->save();

        return response()->json($permission, 200);
    }
    public function destroy($id)
    {
        Permission::where('id', $id)->delete();
        return response()->json(null, 204);
    }
}
