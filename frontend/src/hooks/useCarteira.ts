import { useCallback, useEffect } from 'react'
import { buscarCarteira } from '../services/acaoService'
import type { Carteira } from '../types'
import useDadosAtualizados from './useDadosAtualizados'

const CARTEIRA_VAZIA: Carteira = { saldoDisponivel: 0, minhasAcoes: [] }

export default function useCarteira(usuarioId: number | undefined, aoPerderUsuario: () => void) {
  const buscar = useCallback(
    () => (usuarioId === undefined ? Promise.resolve(CARTEIRA_VAZIA) : buscarCarteira(usuarioId)),
    [usuarioId],
  )
  const { dados, erro, recarregar } = useDadosAtualizados(buscar, CARTEIRA_VAZIA, usuarioId !== undefined)

  useEffect(() => {
    if (erro && erro.status === 404) aoPerderUsuario()
  }, [erro, aoPerderUsuario])

  return {
    saldo: usuarioId === undefined ? null : dados.saldoDisponivel,
    acoes: dados.minhasAcoes,
    recarregar,
  }
}
