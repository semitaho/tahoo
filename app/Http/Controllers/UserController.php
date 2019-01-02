<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller {

    const TABLE_NAME = 'users';

    public function retrieve(Request $request) {
        $ip = $request->ip();
        $user = DB::table(self::TABLE_NAME)->where('id', $ip)->first();
        if (!$user){
            $user = array('id' => $ip);
            if (DB::table(self::TABLE_NAME)->insert($user)){
                return $user;
            }
            return array();
        }
        return json_encode($user);
    }

    public function storeNick(Request $request) {
        $ip = $request->ip();
        $nick = $request->input('nick');
        if (DB::table(SELF::TABLE_NAME)->where('id', $ip)->update(array('nick' => $nick))){
            return json_encode(DB::table(self::TABLE_NAME)->where('id', $ip)->first());
        }
        return array();
    }
}

?>