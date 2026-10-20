import { listarEmpresas } from '../services/empresaService'
import type { EmpresaCard } from '../types'
import useDadosAtualizados from './useDadosAtualizados'

const MERCADO_VAZIO: EmpresaCard[] = []

export default function useMercado() {
  const { dados, recarregar } = useDadosAtualizados(listarEmpresas, MERCADO_VAZIO)
  return { mercado: dados, recarregar }
}
