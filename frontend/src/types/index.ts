export type TipoImpacto = 'POSITIVO' | 'NEGATIVO' | 'NEUTRO'

export type TipoOperacao = 'comprar' | 'vender'

export type AbaId = 'mercado' | 'noticias' | 'portfolio'

export interface Usuario {
  id: number
  nome: string
  email: string
}

export interface EmpresaCard {
  id: number
  sigla: string
  nome: string
  precoAtual: number
  variacaoUltimas24h: number
}

export interface HistoricoPreco {
  preco: number
  dataHora: string
}

export interface EventoNoticia {
  siglaEmpresa: string
  titulo: string
  conteudo: string
  impacto: TipoImpacto
  dataPublicacao: string
}

export interface EmpresaDetalhe {
  id: number
  nome: string
  sigla: string
  descricao: string | null
  precoAtual: number
  grafico: HistoricoPreco[]
  noticiasRecentes: EventoNoticia[]
}

export interface AcaoComprada {
  id: number
  sigla: string
  nomeEmpresa: string
  quantidade: number
  precoMedioCompra: number
  precoAtualMercado: number
  lucroPrejuizoPercentual: number
}

export interface Carteira {
  saldoDisponivel: number
  minhasAcoes: AcaoComprada[]
}

export interface Mensagem {
  mensagem: string
}

export interface DadosAuth {
  nome: string
  email: string
  senha: string
}

export interface Operacao {
  tipo: TipoOperacao
  sigla: string
  maximo: number | null
}

export interface Aviso {
  tipo: 'success' | 'warning' | 'danger'
  texto: string
}

export interface Aba {
  id: AbaId
  rotulo: string
}
