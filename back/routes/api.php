<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;

// Public routes (no authentication required)
Route::get('/products', [ProductController::class, 'index']); // Public route to get products
Route::get('/products/{id}', [ProductController::class, 'show']); // Public route to view a single product
Route::post('/products', [ProductController::class, 'store']);   // Create product
Route::put('/products/{id}', [ProductController::class, 'update']); // Update product
Route::delete('/products/{id}', [ProductController::class, 'destroy']); // Delete product

use App\Http\Controllers\CartController;

// List all CartItems
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::get('/cart/{id}', [CartController::class, 'show']);
Route::put('/cart/{id}', [CartController::class, 'update']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);
Route::delete('/cart/clear', [CartController::class, 'destroyAll']);

use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

