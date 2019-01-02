<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PuzzleController extends Controller {


    
    const PUZZLE_DATA = [
        array(
            "image" => "https://upload.wikimedia.org/wikipedia/fi/9/92/Muumihahmot.JPG",
            "cols" => 3,
            "rows" => 3
        ),
        array(
            "image" => "https://www.luotocompany.fi/wp-content/uploads/2018/09/kuva2.jpg",
            "rows" => 4,
            "cols" => 4
        ),
        array(
            "image" => "https://www.luotocompany.fi/wp-content/uploads/2018/06/dsc_0251-1.jpg", 
            "rows" => 5,
            "cols" => 5
        )];

    //

    public function images($level){
        $puzzleEntry = DB::table('puzzle')->where('id', $level)->first();
        $puzzleEntryNext = DB::table('puzzle')->where('id', $level+1)->first();
        $puzzleEntry->hasNext = $puzzleEntryNext ?  true : false;
        return json_encode($puzzleEntry);
    }

    public function scores(Request $request){
        $puzzle_id = $request->input('puzzle_id');
        if (DB::table('puzzle_score')->insert(
           array('user_id' => $request->input('user_id'),
                 'puzzle_id' => $puzzle_id,
                 'time' => $request->input('time'),
                 'score' => $request->input('score'))))
                 {
                     return $this->scoresByPuzzle($puzzle_id);
        }  
        return array();
    }

    public function scoresByPuzzle($puzzle_id){
        $topScores = DB::table('puzzle_score')
                    ->where('puzzle_id', $puzzle_id)
                    ->orderBy('score', 'asc')
                    ->limit(5)
                    ->get();            
        return json_encode($topScores);
    }
}
