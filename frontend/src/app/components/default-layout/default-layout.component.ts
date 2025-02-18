import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListaTransacoesComponent } from '../lista-transacoes/lista-transacoes.component';

@Component({
  selector: 'app-default-layout',
  imports: [CommonModule, ListaTransacoesComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  menuItems: string[] = [
    'Painel',
    'Analítica',
    'Minha Carteira',
    'Contas',
    'Configurações',
  ];
  activeMenu: string = this.menuItems[0];

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  getIconPath(menuItem: string): string {
    const iconMap: { [key: string]: string } = {
      Painel: '/svg/painel.svg',
      Analítica: '/svg/analitica.svg',
      'Minha Carteira': '/svg/carteira.svg',
      Contas: '/svg/conta.svg',
      Configurações: '/svg/configuracoes.svg',
    };
    return iconMap[menuItem] || '';
  }
}
