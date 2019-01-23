<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SudokuController extends Controller {

    const TABLE = 'sudoku_score';

    function scores(Request $request) {
        $level = $request->input('level');
        if (DB::table(self::TABLE)->insert(
           array('user_id' => $request->input('user_id'),
                 'level' => $level,
                 'created_at' =>  date('Y-m-d H:i:s'),
                 'time' => $request->input('time'))))
                 {
                     return $this->scoresByLevel($level);
        }  
        return array();

    }

    public function scoresByLevel($level){
        $topScores = DB::table(self::TABLE)
                    ->where('level', $level)
                    ->orderBy('time', 'asc')
                    ->limit(5)
                    ->get();            
        return json_encode($topScores);
    }

}

?>