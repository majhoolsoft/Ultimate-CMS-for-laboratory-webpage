<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateCrudRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // only allow updates if the user is Super Admin
        return backpack_auth()->check() && backpack_user()->id == 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userModel = config('backpack.permissionmanager.models.user');
        $userModel = new $userModel();
        $routeSegmentWithId = empty(config('backpack.base.route_prefix')) ? '2' : '3';

        $userId = $this->get('id') ?? \Request::instance()->segment($routeSegmentWithId);

        if (!$userModel->find($userId)) {
            abort(400, 'Could not find that entry in the database.');
        }

        return [
            'email'    => 'required|unique:' . config('permission.table_names.users', 'users') . ',email,' . $userId,
            'name'     => 'required',
        ];
    }
}
