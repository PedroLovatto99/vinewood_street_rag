import Variacao from '../common/Variacao'
import { formatarPreco } from '../../utils/formatadores'
import type { EmpresaCard } from '../../types'

interface Props {
  empresa: EmpresaCard
  onSelecionar: (id: number) => void
}

export default function LinhaEmpresa({ empresa, onSelecionar }: Props) {
  return (
    <tr className="linha-clicavel" onClick={() => onSelecionar(empresa.id)}>
      <td className="fw-bold">{empresa.sigla}</td>
      <td>{empresa.nome}</td>
      <td className="text-end">{formatarPreco(empresa.precoAtual)}</td>
      <td className="text-end">
        <Variacao valor={empresa.variacaoUltimas24h} />
      </td>
    </tr>
  )
}
