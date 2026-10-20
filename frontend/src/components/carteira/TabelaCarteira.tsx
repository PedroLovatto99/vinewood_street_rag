import LinhaAcao from './LinhaAcao'
import type { AcaoComprada } from '../../types'

interface Props {
  acoes: AcaoComprada[]
  onVender: (sigla: string, maximo: number) => void
}

export default function TabelaCarteira({ acoes, onVender }: Props) {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover align-middle mb-0">
        <thead>
          <tr className="text-muted border-bottom border-secondary">
            <th>Ativo</th>
            <th>Empresa</th>
            <th className="text-end">Qtd</th>
            <th className="text-end">Médio Pago</th>
            <th className="text-end">Atual</th>
            <th className="text-end">Lucro/Prej</th>
            <th className="text-end">Ação</th>
          </tr>
        </thead>
        <tbody>
          {acoes.length === 0 ? (
            <tr><td colSpan={7} className="text-center py-4">Carteira vazia</td></tr>
          ) : acoes.map(acao => (
            <LinhaAcao key={acao.id} acao={acao} onVender={onVender} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
