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
    'Entrada',
    'Saida'
  ];

  getIconPath(transacaoItems: string): string {
    const iconMap: { [key: string]: string } = {
      Entrada: '/svg/entrada.svg',
      Saida: '/svg/saida.svg',
    };
    return iconMap[transacaoItems] || '';
  }
}
