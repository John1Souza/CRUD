import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTransacoesComponent } from './components/lista-transacoes/lista-transacoes.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaTransacoesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
