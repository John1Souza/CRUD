<?php

namespace App\Http\Controllers;

use App\Models\TipoTransacao;
use Illuminate\Http\Request;

class TipoTransacaoController extends Controller
{
    public function index()
    {
        //return Transacao::with('TipoTransacao')->get();
        $tipoTransacao = TipoTransacao::all();
        return response()->json($tipoTransacao);
    }

    public function store(Request $request)
    {
        return TipoTransacao::create($request->all());
    }

    public function update(Request $request, TipoTransacao $tipoTransacao)
    {
        $tipoTransacao->update($request->all());
        return $tipoTransacao;
    }

    public function destroy(TipoTransacao $tipoTransacao)
    {
        $tipoTransacao->delete();
        return response()->noContent();
    }
}

// namespace App\Http\Controllers;

// use App\Models\Transacao;
// use Illuminate\Http\Request;

// class TransacaoController extends Controller
// {
//     public function index() {
//         return Transacao::all();
//     }

//     public function store(Request $request) {
//         return Transacao::create($request->all());
//     }

//     public function update(Request $request, $id) {
//         $transacao = Transacao::findOrFail($id);
//         $transacao->update($request->all());
//         return $transacao;
//     }

//     public function destroy($id) {
//         return Transacao::destroy($id);
//     }
// }
