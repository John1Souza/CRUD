import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransacaoService } from '../../services/transacao.service';
import { CommonModule } from '@angular/common';
import { Transacao, TipoTransacao } from '../../services/transacao.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-transacoes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-transacoes.component.html',
  styleUrl: './lista-transacoes.component.scss',
})
export class ListaTransacoesComponent implements OnInit {
  transacoes: any[] = [];
  tipoTransacoes: TipoTransacao[] = [];
  meuFormulario!: FormGroup;
  tipos = ['receita', 'despesa'];
  isVisible: boolean = false;

  constructor(
    private transacaoService: TransacaoService,
    private fb: FormBuilder) {
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



  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta Transação?')) {
      this.transacaoService.excluir(id).subscribe(
        {
          next: () => {
          this.transacoes = this.transacoes.filter(transacao => transacao.id !== id);
          alert('Transação excluído com sucesso!');
        },
        error: (erro) => console.error(erro)
      }
      );
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

      const transacao: Transacao = {
        valor: formData.valor,
        tipo: formData.tipo,
        descricao: formData.descricao,
        tipo_transacao_id: formData.tipo_transacao_id,
      }


      this.transacaoService.criar(transacao).subscribe({
          next: () => {
              alert('Produto criado com sucesso!');
              this.meuFormulario.reset();
            },
            error: (err) => console.error('Erro ao criar novo item', err)
        }
      );
    }
  }
}
