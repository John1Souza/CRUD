import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Transacao } from '../../services/transacao.model';
import { TransacaoService } from '../../services/transacao.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-card-transacao',
  imports: [CommonModule],
  templateUrl: './card-transacao.component.html',
  styleUrl: './card-transacao.component.scss'
})
export class CardTransacaoComponent {
  tipos: string[] = [
    'receita',
    'despesa'
  ];

  totalReceita: number = 0;
  totalDespesa: number = 0;
  totalTransacoes: number = 0;

  transacoes: Transacao[] = [];

  constructor(private transacaoService: TransacaoService) {};

  ngOnInit(){
    this.carregarTotais();

  }

  carregarTotais(): void {
    forkJoin({
      receitas: this.transacaoService.getTotalReceitas(),
      despesas: this.transacaoService.getTotalDespesas()
  }).subscribe({
      next: (response) => {
          this.totalReceita = Number(response.receitas.total_receitas);
          this.totalDespesa = Number(response.despesas.total_despesas);
          this.totalTransacoes = this.totalReceita + this.totalDespesa;
          console.log('Receitas:', this.totalReceita);
          console.log('Despesas:', this.totalDespesa);
          console.log('Total Transações:', this.totalTransacoes);
      },
      error: (error) => {
          console.error('Erro ao carregar totais:', error);
      }
  });
  }

  totalReceitas(): void {
    this.transacaoService.getTotalReceitas().subscribe(
      {
        next: (response) => {
          this.totalReceita = response.total_receitas,
          this.atualizarTotalTransacoes();
        },
        error: (error) => {console.error('Erro ao carregar total de receitas:', error);}
      }
    )
  }

  totalDespesas(): void {
    this.transacaoService.getTotalDespesas().subscribe(
      {
        next: (response) => {
          this.totalDespesa = response.total_despesas,
          this.atualizarTotalTransacoes();
        },
        error: (error) => {console.error('Erro ao carregar total de despesas: ', error)}
      }
    )
  }

  atualizarTotalTransacoes(): void {
    this.totalTransacoes = this.totalReceita + this.totalDespesa;
    console.log('Total Transações:', this.totalTransacoes);
  }
}
