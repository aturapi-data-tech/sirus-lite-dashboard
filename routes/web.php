<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RJ\PasienRawatJalanController;
use App\Http\Controllers\UGD\PasienUGDController;
use App\Http\Controllers\BPJS\ApiBpjsController;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/RJ/PasienRawatJalan', [PasienRawatJalanController::class, 'index'])->name('RJ.PasienRawatJalan');
    Route::get('/RJ/PasienRawatJalanPoli', [PasienRawatJalanController::class, 'indexRJPoli'])->name('RJ.PasienRawatJalanPoli');
    Route::get('/RJ/PasienEMRRawatJalan', [PasienRawatJalanController::class, 'indexEMRRJ'])->name('RJ.PasienEMRRawatJalan');


    Route::get('/RJ/PasienEMRUGD', [PasienUGDController::class, 'indexEMRUGD'])->name('RJ.PasienEMRUGD');



    Route::get('/BPJS/ApiBpjsWSChecking', [ApiBpjsController::class, 'index'])->name('BPJS.ApiBpjsWSChecking');
    Route::get('/BPJS/ref_poliklinik', [ApiBpjsController::class, 'ref_poliklinik'])->name('BPJS.ref_poliklinik');



    Route::get('/MJKN/BookingMJKN', [PasienRawatJalanController::class, 'indexBookingMjkn'])->name('MJKN.BookingMJKN');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
