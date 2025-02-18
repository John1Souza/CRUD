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

  transacaoItems: string[] = [
    'Entrada',
    'Saida'
  ];

  constructor(private transacaoService: TransacaoService) {}
  excluir() {}

  ngOnInit() {
    this.transacaoService.listar().subscribe((data) => {
      this.transacoes = data;
    });
  }

  getIconPath(transacaoItems: string): string {
    const iconMap: { [key: string]: string } = {
      Entrada: '/svg/entrada.svg',
      Saida: '/svg/saida.svg',
    };
    return iconMap[transacaoItems] || '';
  }
}
