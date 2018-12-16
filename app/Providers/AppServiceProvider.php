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
            ['label' => 'Etusivu', 'path' => '/'],
            ['label' => 'Palvelut', 'path' => 'palvelut'],
            ['label' => 'CV', 'path' => 'cv'],
            ['label' => 'Pelit', 'path' => 'pelit'],
            ['label' => 'Blogit', 'path' => 'blogit']

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
