import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTransacoesComponent } from './components/lista-transacoes/lista-transacoes.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';


export const routes: Routes = [
  { path: '', redirectTo: '/default', pathMatch: 'full' },
  { path: 'default', component: DefaultLayoutComponent },
  { path: 'transacoes', component: ListaTransacoesComponent },
  // { path: 'transacoes/criar', component: TransactionFormComponent },
  // { path: 'transacoes/editar/:id', component: TransactionFormComponent },
];


