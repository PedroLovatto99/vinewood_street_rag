import LinhaEmpresa from './LinhaEmpresa'
import type { EmpresaCard } from '../../types'

interface Props {
  mercado: EmpresaCard[]
  onSelecionar: (id: number) => void
}

export default function TabelaMercado({ mercado, onSelecionar }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr className="text-muted border-bottom border-secondary">
            <th>Sigla</th>
            <th>Empresa</th>
            <th className="text-end">Preço Atual</th>
            <th className="text-end">Tendência (3h)</th>
          </tr>
        </thead>
        <tbody>
          {mercado.length === 0 ? (
            <tr><td colSpan={4} className="text-center py-4">Carregando mercado...</td></tr>
          ) : mercado.map(empresa => (
            <LinhaEmpresa key={empresa.id} empresa={empresa} onSelecionar={onSelecionar} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
