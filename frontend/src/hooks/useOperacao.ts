import { useState } from 'react'
import { comprarAcao, venderAcao } from '../services/acaoService'
import type { Operacao, TipoOperacao } from '../types'

export default function useOperacao(
  usuarioId: number | undefined,
  aoConcluir: (tipo: TipoOperacao, mensagem: string) => void,
) {
  const [operacao, setOperacao] = useState<Operacao | null>(null)
  const [processando, setProcessando] = useState(false)
  const [erro, setErro] = useState('')

  const iniciar = (tipo: TipoOperacao, sigla: string, maximo: number | null = null) => {
    setErro('')
    setOperacao({ tipo, sigla, maximo })
  }

  const cancelar = () => setOperacao(null)

  const confirmar = async (quantidade: number) => {
    if (!operacao || usuarioId === undefined) return

    if (isNaN(quantidade) || quantidade <= 0) {
      setErro('Quantidade inválida.')
      return
    }

    setProcessando(true)
    setErro('')
    try {
      const executar = operacao.tipo === 'comprar' ? comprarAcao : venderAcao
      const resposta = await executar(usuarioId, operacao.sigla, quantidade)
      const { tipo } = operacao
      setOperacao(null)
      aoConcluir(tipo, resposta.mensagem)
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setProcessando(false)
    }
  }

  return { operacao, processando, erro, iniciar, cancelar, confirmar }
}
