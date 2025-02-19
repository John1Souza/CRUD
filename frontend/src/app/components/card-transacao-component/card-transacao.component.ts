import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-transacao',
  imports: [CommonModule],
  templateUrl: './card-transacao.component.html',
  styleUrl: './card-transacao.component.scss'
})
export class CardTransacaoComponent {
  transacaoItems: string[] = [
    'receita',
    'despesa'
  ];

  getIconPath(transacaoItems: string): string {
    const iconMap: { [key: string]: string } = {
      receita: '/svg/receita.svg',
      despesa: '/svg/despesa.svg',
    };
    return iconMap[transacaoItems] || '';
  }
}
