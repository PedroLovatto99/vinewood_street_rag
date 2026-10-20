import { API_URL } from '../config/api'

interface DetalheValidacao {
  msg: string
}

interface CorpoErro {
  detail?: string | DetalheValidacao[]
}

export class ErroApi extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.status = status
  }
}

function extrairMensagem(corpo: CorpoErro | null) {
  if (!corpo || !corpo.detail) return null
  if (typeof corpo.detail === 'string') return corpo.detail
  return corpo.detail.map(erro => erro.msg).join(' ')
}

export async function requisitar<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
    })
  } catch {
    throw new ErroApi('Servidor indisponível. A conexão com Vinewood falhou.', 0)
  }

  const corpo = await resposta.json().catch(() => null)

  if (!resposta.ok) {
    throw new ErroApi(extrairMensagem(corpo) || 'Erro inesperado no servidor.', resposta.status)
  }
  return corpo as T
}

export function post<T>(caminho: string, dados: unknown) {
  return requisitar<T>(caminho, { method: 'POST', body: JSON.stringify(dados) })
}
