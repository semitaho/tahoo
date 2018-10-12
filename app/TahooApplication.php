<?php
/**
 * Created by IntelliJ IDEA.
 * User: toni.aho
 * Date: 05/07/2018
 * Time: 2.47
 */

namespace App;


use Illuminate\Foundation\Application;

class TahooApplication extends Application
{
    public function publicPath()
    {
        return $this->basePath;
    }


}
