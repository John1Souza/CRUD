<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('transacao', function (Blueprint $table) {
            $table->id();
            $table->string('descricao');
            $table->decimal('valor', 10, 2);
            $table->foreignId('tipo_id')->constrained('tipo_transacao');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transacao');
    }
};
