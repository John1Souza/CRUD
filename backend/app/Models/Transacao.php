<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transacao extends Model
{
    use HasFactory;
    protected $table = 'transacao';
    protected $fillable = [
        'descricao',
        'valor',
        'tipo',
        'tipo_transacao_id'
    ];

    public function tipoTransacao()
    {
        return $this->belongsTo(TipoTransacao::class, 'tipo_transacao_id');
    }
}
