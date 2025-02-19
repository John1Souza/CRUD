import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoTransacao, Transacao } from './transacao.model';

@Injectable({
  providedIn: 'root'
})

export class TransacaoService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  listarTransacao(id: number) {
    return this.http.get<any[]>(this.apiUrl);
  }

  criar(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.apiUrl}/transacoes`, transacao);
  }

  listarTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes`);
  }

  atualizar(id: number, transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(`${`${this.apiUrl}/transacoes`}/${id}`, transacao);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${`${this.apiUrl}/transacoes`}/${id}`);
  }

  getTransactionTypes(): Observable<TipoTransacao[]> {
    return this.http.get<TipoTransacao[]>(`${this.apiUrl}/tipo_transacoes`);
  }
}
