import { useCallback, useEffect, useRef, useState } from 'react'
import { INTERVALO_ATUALIZACAO } from '../config/api'
import type { ErroApi } from '../services/api'

export default function useDadosAtualizados<T>(buscar: () => Promise<T>, valorInicial: T, ativo = true) {
  const [dados, setDados] = useState<T>(valorInicial)
  const [erro, setErro] = useState<ErroApi | null>(null)
  const buscarRef = useRef(buscar)

  useEffect(() => {
    buscarRef.current = buscar
  }, [buscar])

  const recarregar = useCallback(async () => {
    try {
      setDados(await buscarRef.current())
      setErro(null)
    } catch (e) {
      setErro(e as ErroApi)
    }
  }, [])

  useEffect(() => {
    if (!ativo) return
    recarregar()
    const intervalo = setInterval(recarregar, INTERVALO_ATUALIZACAO)
    return () => clearInterval(intervalo)
  }, [ativo, buscar, recarregar])

  return { dados, erro, recarregar }
}
