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
        $transacoes = Transacao::with('tipoTransacao')->get();
        return response()->json($transacoes);
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

    public function destroy($id)
    {
        $transacao = Transacao::find($id);

        if (!$transacao) {
            return response()->json(['message' => 'Transação não encontrada'], 404);
        }

        $transacao->delete();

        $check = Transacao::find($id);

        if ($check) {
            return response()->json(['message' => 'O item ainda existe!'], 500);
        }

        return response()->json(['message' => 'Transação excluída com sucesso'], 200);
    }

    public function filterByType($tipo)
    {

        $transacoes = Transacao::where('tipo', $tipo)->get();

        return response()->json($transacoes);
    }

    public function getTotalReceitas()
    {
        $totalReceitas = Transacao::where('tipo', "receita")->sum('valor');
        return response()->json(['total_receitas' => $totalReceitas]);
    }

    public function getTotalDespesas()
    {
        $totalDespesas = Transacao::where('tipo', 'despesa')->sum('valor');
        return response()->json(['total_despesas' => $totalDespesas]);
    }
}
