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

  listarTransacao(id: number): Observable<Transacao> {
      return this.http.get<Transacao>(`${this.apiUrl}/transacoes/${id}`);
  }

  listarTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes`);
  }

  criar(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.apiUrl}/transacoes`, transacao);
  }

  atualizar(id: number, transacao: Transacao): Observable<any> {
    return this.http.put(`${this.apiUrl}/transacoes/${id}`, transacao);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transacoes/${id}`);
  }

  getTransactionTypes(): Observable<TipoTransacao[]> {
    return this.http.get<TipoTransacao[]>(`${this.apiUrl}/tipo_transacoes`);
  }

  filterByType(tipo: string): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes/filter/${tipo}`);
  }
}
