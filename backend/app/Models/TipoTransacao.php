<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoTransacao extends Model
{
    use HasFactory;
    protected $table = 'tipo_transacao';
    protected $fillable = [
        'nome'
    ];
}
