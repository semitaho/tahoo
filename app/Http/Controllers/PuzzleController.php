<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        return self::PUZZLE_DATA[$level-1];
    }
}
