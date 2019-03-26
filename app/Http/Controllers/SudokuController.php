<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SudokuController extends Controller {

    const TABLE = 'sudoku_score';

    function scores(Request $request) {
        $level = $request->input('level');

        $updated = DB::TABLE(self::TABLE)
        ->where( [['user_id', '=',$request->input('user_id') ], 
                  ['level', '=',$level]])
        ->update([ 'created_at' =>  date('Y-m-d H:i:s'), 
                   'time' => $request->input('time')]);

        if ($updated > 0) {
            return $this->fetchScores($level);
        }           

        if (DB::table(self::TABLE)->insert(
           array('user_id' => $request->input('user_id'),
                 'level' => $level,
                 'created_at' =>  date('Y-m-d H:i:s'),
                 'time' => $request->input('time'))))
                 {
                     return $this->fetchScores($level);
        }  
        return array();

    }

    public function fetchScores($level){
        $topScores = DB::table(self::TABLE)
                    ->join('users', SELF::TABLE.'.user_id', 'users.id')
                    ->where('level', $level)
                    ->orderBy('time', 'asc')
                    ->get();            
        return json_encode($topScores);
    }

}

?>