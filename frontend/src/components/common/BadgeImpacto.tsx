import type { TipoImpacto } from '../../types'

const CORES: Record<TipoImpacto, string> = {
  POSITIVO: 'bg-success',
  NEGATIVO: 'bg-danger',
  NEUTRO: 'bg-secondary',
}

interface Props {
  impacto: TipoImpacto
  className?: string
}

export default function BadgeImpacto({ impacto, className = '' }: Props) {
  return <span className={`badge ${CORES[impacto]} ${className}`}>{impacto}</span>
}
