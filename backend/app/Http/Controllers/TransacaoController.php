<?php

namespace App\Http\Controllers;

use App\Models\TipoTransacao;
use App\Models\Transacao;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TransacaoController extends Controller
{
    public function index()
    {
        //return Transacao::with('TipoTransacao')->get();
        return Transacao::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'descricao' => 'required|string',
            'valor' => 'required|numeric',
            'tipo' => 'required|in:receita,despesa',
            'tipo_transacao_id' => 'required|exists:tipo_transacao,id',
        ]);

        if ($data['tipo'] === 'despesa') {
            $data['valor'] = -abs($data['valor']);
        }

        return Transacao::create($data);
    }

    public function show($id): JsonResponse
    {
        $transacao = Transacao::findOrFail($id);
        return response()->json($transacao);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $data = $request->validate([
            'descricao' => 'sometimes|string',
            'valor' => 'sometimes|numeric',
            'tipo' => 'sometimes|in:receita,despesa',
            'tipo_transacao_id' => 'sometimes|exists:tipo_transacao,id',
        ]);

        if (isset($data['tipo']) && $data['tipo'] === 'despesa') {
            $data['valor'] = -abs($data['valor']);
        }

        $transacao = Transacao::findOrFail($id);
        $transacao->update($data);
        return response()->json(['message' => 'Transação atualizada com sucesso', 'data' => $transacao], 200);
    }

    public function destroy(Transacao $transacao)
    {
        $transacao->delete();
        return response()->noContent();
    }

    public function filterByType($tipo)
    {
        $tipoId = TipoTransacao::where('nome', $tipo)->firstOrFail()->id;
        return Transacao::where('tipo_transacao_id', $tipoId)->with('tipo')->get();
    }
}
