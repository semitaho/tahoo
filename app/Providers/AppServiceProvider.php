<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Config;


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
            ['label' => 'Pelit', 'path' => 'pelit', 'new' => false],
            ['label' => 'Blogit', 'path' => 'blogit', 'new' => false]

        ]);
        setlocale(LC_ALL, "fi_FI");

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

    function getClient() 
    {
        $client_id = Config::get('google.client_id');
        $client = new \Google_Client();
        $client->setScopes(Google_Service_Docs::DOCUMENTS_READONLY);
        $client->setAuthConfig('credentials.json');

        $client->setApplicationName('Tahoo'); 
        print_r($client);
        
    }
}
