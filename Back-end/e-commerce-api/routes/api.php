<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MobileController;
use App\Http\Controllers\Api\LabtopController;
use App\Http\Controllers\Api\Auth\AuthController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Crud For Mobile
Route::get('mobiles',[MobileController::class,'index']);
Route::get('mobiles/{mobile}',[MobileController::class,'show']);
Route::post('mobiles',[MobileController::class,'store']);
Route::post('/mobiles/{mobile}',[MobileController::class,'update']);
Route::delete('/mobiles/delete/{mobile}',[MobileController::class,'destroy']);


// Crud For Labtop
Route::get('labtops',[LabtopController::class,'index']);
Route::get('labtops/{labtop}',[LabtopController::class,'show']);
Route::post('labtops',[LabtopController::class,'store']);
Route::post('/labtops/{labtop}',[LabtopController::class,'update']);
Route::delete('/labtops/delete/{labtop}',[LabtopController::class,'destroy']);


// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login' ,[AuthController::class , 'login'] );
Route::get('/logout' , [AuthController::class, 'logout']);
Route::get('/users' , [AuthController::class, 'index']);
Route::delete('/user/delete/{user}',[AuthController::class,'destroy']);



Route::get('/test',function () {
    return 'welcome';
})->middleware(['auth:sanctum' , 'admin']);
