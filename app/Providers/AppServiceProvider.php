<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        View::share('navigation', [
            ['label' => 'Etusivu', 'path' => '/', 'new' => false],
          //  ['label' => 'Palvelut', 'path' => 'palvelut'],
            ['label' => 'CV', 'path' => 'cv', 'new' => false],
            ['label' => 'Pelit', 'path' => 'pelit', 'new' => true],
            ['label' => 'Blogit', 'path' => 'blogit', 'new' => false]

        ]);
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
