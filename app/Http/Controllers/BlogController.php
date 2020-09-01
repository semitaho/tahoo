<?php
/**
 * Created by IntelliJ IDEA.
 * User: toni.aho
 * Date: 03/08/2018
 * Time: 0.11
 */


namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\App;


class BlogController
{

    function index()
    {
       
        $blogs = DB::table('blog')->where('published', 1)->get();
        return view('blogs', ['blogs' => $blogs]);
    }

    function fetch($entry)
    {
    
        

        $blogEntry = DB::table('blog')->where('entry', $entry)->first();
        if ($blogEntry === null){
            return Redirect::route('blogs');
        }
        $blogEntry->parsed_date = date('d.n.Y', strtotime($blogEntry->created));
        return view('bloglayout', ['blog' => $blogEntry]);
    }

}

?>
