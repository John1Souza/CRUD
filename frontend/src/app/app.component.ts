import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTransacoesComponent } from './components/lista-transacoes/lista-transacoes.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
