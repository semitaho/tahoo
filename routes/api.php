<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('puzzles/{level}', 'PuzzleController@images');
Route::post('puzzles/scores', 'PuzzleController@scores');

Route::post('sudoku', 'SudokuController@scores');
Route::get('sudoku/scores/{level}', 'SudokuController@fetchScores');


Route::post('user', 'UserController@retrieve');
Route::put('user', 'UserController@storeNick');

Route::post('nopeustesti', 'NopeustestiController@scores');
Route::get('nopeustesti/scores', 'NopeustestiController@fetchScores');


