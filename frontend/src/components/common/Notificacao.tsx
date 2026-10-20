import { useEffect } from 'react'
import type { Aviso } from '../../types'

const DURACAO = 4000

interface Props {
  aviso: Aviso | null
  onFechar: () => void
}

export default function Notificacao({ aviso, onFechar }: Props) {
  useEffect(() => {
    if (!aviso) return
    const temporizador = setTimeout(onFechar, DURACAO)
    return () => clearTimeout(temporizador)
  }, [aviso, onFechar])

  if (!aviso) return null

  return (
    <div className={`alert alert-${aviso.tipo} aviso-flutuante shadow`} role="alert">
      {aviso.texto}
    </div>
  )
}
