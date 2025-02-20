export interface Transacao {
  id: number;
  valor: number;
  tipo: 'receita' | 'despesa';
  descricao: string;
  tipo_transacao_id?: number;
  created_at?: string;
  updated_at?: string;
  editando: boolean;
  total_receitas: number;
  total_despesas: number;
};

export interface TipoTransacao {
  id?: number;
  nome: string;
  created_at?: string;
  updated_at?: string;
};
