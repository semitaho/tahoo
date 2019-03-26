<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NopeustestiController extends Controller {

  const TABLE = 'nopeustesti_score';

  function scores(Request $request) {

    $updated = DB::TABLE(self::TABLE)
    ->where( [['user_id', '=',$request->input('user_id') ]])
    ->update([ 'created_at' =>  date('Y-m-d H:i:s'), 
               'points' => $request->input('points'),
               'time' => $request->input('time')]);

    if ($updated > 0) {
        return $this->fetchScores($request);
    }           

    if (DB::table(self::TABLE)->insert(
       array('user_id' => $request->input('user_id'),
             'points' => $request->input('points'),
             'created_at' =>  date('Y-m-d H:i:s'),
             'time' => $request->input('time'))))
             {
                 return $this->fetchScores($request);
                }  
    return array();

}



  function fetchScores(Request $request) {
    $topScores = DB::table(self::TABLE)
    ->join('users', SELF::TABLE.'.user_id', 'users.id')
    ->orderBy('points', 'desc')
    ->orderBy('time', 'asc')
    ->get();            
    return json_encode($topScores);
  }
}

?>