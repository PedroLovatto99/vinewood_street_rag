import { useCallback } from 'react'
import { buscarEmpresa } from '../services/empresaService'
import type { EmpresaDetalhe } from '../types'
import useDadosAtualizados from './useDadosAtualizados'

export default function useEmpresaDetalhe(empresaId: number) {
  const buscar = useCallback(() => buscarEmpresa(empresaId), [empresaId])
  const { dados, erro } = useDadosAtualizados<EmpresaDetalhe | null>(buscar, null)
  return { empresa: dados, erro }
}
