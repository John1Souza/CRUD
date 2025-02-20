<?php

use App\Http\Controllers\TipoTransacaoController;
use App\Http\Controllers\TransacaoController;
use Illuminate\Support\Facades\Route;

Route::get('/transacoes/filter/{type}', [TransacaoController::class, 'filterByType']);
Route::get('/transacoes/total_receitas', [TransacaoController::class, 'getTotalReceitas']);
Route::get('/transacoes/total_despesas', [TransacaoController::class, 'getTotalDespesas']);
Route::apiResource('transacoes', TransacaoController::class);
Route::apiResource('tipo_transacoes', TipoTransacaoController::class);
