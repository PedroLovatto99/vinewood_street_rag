import { formatarPercentual } from '../../utils/formatadores'

export default function Variacao({ valor }: { valor: number }) {
  const positiva = valor >= 0
  return (
    <span className={`fw-bold ${positiva ? 'text-success' : 'text-danger'}`}>
      {formatarPercentual(valor)} {positiva ? '▲' : '▼'}
    </span>
  )
}
