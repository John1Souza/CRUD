import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransacaoService } from '../../services/transacao.service';
import { CommonModule } from '@angular/common';
import { Transacao, TipoTransacao } from '../../services/transacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-lista-transacoes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-transacoes.component.html',
  styleUrl: './lista-transacoes.component.scss',
})
export class ListaTransacoesComponent implements OnInit {
  transacaoEditando: any = null;
  transacoes: Transacao[] = [];
  tipoTransacoes: TipoTransacao[] = [];
  meuFormulario!: FormGroup;
  transacaoForm!: FormGroup;
  tipos = ['receita', 'despesa'];
  isVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private transacaoService: TransacaoService,

  ) {
    this.meuFormulario = this.fb.group({

      tipo: ['receita', Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo_transacao_id: ['', Validators.required],
    });
  }

  toggleDisplay() {
    this.isVisible = !this.isVisible;
  }


  ngOnInit() {
    this.listarTransacoes();
    this.carregarTiposDeTransacoes();
  }

  carregarTransacao(id: number) {
    this.transacaoService.listarTransacao(id).subscribe((transaction) => {
      this.meuFormulario.patchValue({
        descricao: transaction.descricao,
        valor: Math.abs(transaction.valor),
        tipo: transaction.valor >= 0 ? 'receita' : 'despesa',
        tipo_transacao_id: transaction.tipo_transacao_id,
      });
    });
  }

  carregarTiposDeTransacoes(): void {
    this.transacaoService.getTransactionTypes().subscribe({
      next: (tipos) => {
        this.tipoTransacoes = tipos;
      },
      error: (err) => {
        console.error('Erro ao carregar tipos de transação: ', err)
      }
    })
  }


  listarTransacoes(): void {
    this.transacaoService.listarTransacoes().subscribe((data) => {
      this.transacoes = data;
  })};

  editarTransacao(transacoes: any) {
    this.transacaoEditando = transacoes;
    this.transacaoForm.patchValue({
      descricao: transacoes.descricao,
      valor: Math.abs(transacoes.valor),
      tipo: transacoes.valor >= 0 ? 'receita' : 'despesa',
      tipo_transacao_id: transacoes.tipo_transacao_id,
    });
  }

  salvarEdicao() {
    if (this.transacaoForm.valid) {
      const formValue = this.transacaoForm.value;

      if (formValue.tipo === 'despesa') {
        formValue.amount = -Math.abs(formValue.amount);
      }

      this.transacaoService.atualizar(this.transacaoEditando.id, formValue).subscribe(() => {
        this.listarTransacoes();
        this.cancelarEdicao();
      });
    }
  }

  cancelarEdicao() {
    this.transacaoEditando = null; // Fecha o formulário
    this.transacaoForm.reset(); // Limpa o formulário
  }



  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta Transação?')) {
      this.transacaoService.excluir(id).subscribe({
          next: () => {
            // this.transacoes = this.transacoes.filter(transacao => transacao.id !== id);
            console.log(`Transação ${id} excluída, recarregando lista...`);
            this.listarTransacoes();
            alert('Transação excluído com sucesso!');
        },
        error: (erro) => console.error(erro)
      });
    }
  }

  getIconPath(transacaoItems: string): string {
    const iconMap: { [key: string]: string } = {
      receita: '/svg/receita.svg',
      despesa: '/svg/despesa.svg',
    };
    return iconMap[transacaoItems] || '';
  }

  onSubmit() {
    if (this.meuFormulario.valid) {
      const formData = this.meuFormulario.value;
      console.log('Dados do formulário:', formData);

      if (formData.tipo === 'despesa') {
        formData.valor = -Math.abs(formData.valor);
      }
      this.transacaoService.criar(formData).subscribe(() => {
        this.router.navigate(['/transacoes']);
      });
    }
  }
}
