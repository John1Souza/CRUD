<?php

use App\Http\Controllers\TipoTransacaoController;
use App\Http\Controllers\TransacaoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('transacoes', TransacaoController::class);
Route::apiResource('tipo_transacoes', TipoTransacaoController::class);
Route::get('/transactions/filter/{type}', [TransacaoController::class, 'filterByType']);
