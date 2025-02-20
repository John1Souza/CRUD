import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import { TransacaoService } from '../../services/transacao.service';
import { CommonModule } from '@angular/common';
import { Transacao, TipoTransacao } from '../../services/transacao.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-transacoes',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './lista-transacoes.component.html',
  styleUrl: './lista-transacoes.component.scss',
})
export class ListaTransacoesComponent implements OnInit {
  editando: any = null;
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

  editar(transacoes: any) {
    transacoes.editando = true;
  }

  salvar(transacoes: any) {
    this.transacaoService.atualizar(transacoes.id, transacoes).subscribe(() => {
        transacoes.editando = false;
    });
  }

  onFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const tipoSelecionado = selectElement.value;

    if (tipoSelecionado && tipoSelecionado != 'Tipo') {
      this.transacaoService.filterByType(tipoSelecionado).subscribe(
        {
          next: (transacoes: Transacao[]) => {
                  this.transacoes = transacoes;
          },
        error: (error) => {
          console.error('Erro ao filtrar transações:', error);
        }
      });
    } else {
      // this.transacoes = [];
      this.listarTransacoes();
    }
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

  onSubmit() {
    if (this.meuFormulario.valid) {
      const formData = this.meuFormulario.value;
      console.log('Dados do formulário:', formData);

      if (formData.tipo === 'despesa') {
        formData.valor = -Math.abs(formData.valor);
      }
      this.transacaoService.criar(formData).subscribe(() => {
        this.meuFormulario.reset();
        this.listarTransacoes();
      });

    }
  }
}
