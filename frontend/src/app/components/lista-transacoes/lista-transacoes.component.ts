import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../../services/transacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-transacoes',
  imports: [CommonModule],
  templateUrl: './lista-transacoes.component.html',
  styleUrl: './lista-transacoes.component.scss',
})
export class ListaTransacoesComponent implements OnInit {
  transacoes: any[] = [];

  constructor(private transacaoService: TransacaoService) {}
  excluir() {}

  ngOnInit() {
    this.transacaoService.listar().subscribe((data) => {
      this.transacoes = data;
    });
  }
}
