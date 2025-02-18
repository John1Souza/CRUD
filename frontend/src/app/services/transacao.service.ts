import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private apiUrl = 'http://127.0.0.1:8000/api/transacoes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  criar(transacao: any) {
    return this.http.post(this.apiUrl, transacao);
  }

  editar(id: number, transacao: any) {
    return this.http.put(`${this.apiUrl}/${id}`, transacao);
  }

  excluir(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
