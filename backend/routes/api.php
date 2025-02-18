<?php

use App\Http\Controllers\TransacaoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('transacoes', TransacaoController::class);
