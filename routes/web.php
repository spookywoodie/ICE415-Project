<?php

use App\Http\Controllers\AddResourceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProvinceController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\ExpenseController; // Import the new ExpenseController
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/region', [AddResourceController::class, 'addRegion'])->name('add.region');
    Route::post('/province', [AddResourceController::class, 'addProvince'])->name('add.province');
    Route::post('/expense', [AddResourceController::class, 'addExpense'])->name('add.expense'); // New route for adding expenses

    Route::resource('regions', RegionController::class);
    Route::resource('provinces', ProvinceController::class);
    Route::resource('expenses', ExpenseController::class); // Expense tracker routes
});


require __DIR__.'/auth.php';