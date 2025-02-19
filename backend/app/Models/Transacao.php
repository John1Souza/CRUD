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
}
