<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Public routes (no authentication required)
Route::get('/products', [ProductController::class, 'index']); // Public route to get products
Route::get('/products/{id}', [ProductController::class, 'show']); // Public route to view a single product
Route::post('/products', [ProductController::class, 'store']);   // Create product
Route::put('/products/{id}', [ProductController::class, 'update']); // Update product
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete product