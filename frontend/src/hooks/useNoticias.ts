import { listarNoticias } from '../services/noticiaService'
import type { EventoNoticia } from '../types'
import useDadosAtualizados from './useDadosAtualizados'

const NOTICIAS_VAZIAS: EventoNoticia[] = []

export default function useNoticias() {
  const { dados, recarregar } = useDadosAtualizados(listarNoticias, NOTICIAS_VAZIAS)
  return { noticias: dados, recarregar }
}
