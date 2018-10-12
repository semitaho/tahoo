<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index', ['name' => 'Toni']);
});

Route::get('/contact', function () {
    return view('contact', ['name' => 'Toni']);
});

Route::get('/cv', 'CvController@index');

Route::get('/blogit', 'BlogController@index')->name('blogs');

Route::view('/palvelut', 'services');



Route::get('/blogit/{entryid}', 'BlogController@fetch');

