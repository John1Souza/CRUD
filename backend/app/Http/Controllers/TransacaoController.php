<?php

namespace App\Http\Controllers;

use App\Models\Transacao;
use Illuminate\Http\Request;

class TransacaoController extends Controller
{
    public function index() {
        return Transacao::all();
    }

    public function store(Request $request) {
        return Transacao::create($request->all());
    }

    public function update(Request $request, $id) {
        $transacao = Transacao::findOrFail($id);
        $transacao->update($request->all());
        return $transacao;
    }

    public function destroy($id) {
        return Transacao::destroy($id);
    }
}
