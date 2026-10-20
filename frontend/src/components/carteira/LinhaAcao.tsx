import Variacao from '../common/Variacao'
import { formatarPreco } from '../../utils/formatadores'
import type { AcaoComprada } from '../../types'

interface Props {
  acao: AcaoComprada
  onVender: (sigla: string, maximo: number) => void
}

export default function LinhaAcao({ acao, onVender }: Props) {
  return (
    <tr>
      <td className="fw-bold text-verde">{acao.sigla}</td>
      <td>{acao.nomeEmpresa}</td>
      <td className="text-end">{acao.quantidade}</td>
      <td className="text-end text-muted">{formatarPreco(acao.precoMedioCompra)}</td>
      <td className="text-end fw-bold text-white">{formatarPreco(acao.precoAtualMercado)}</td>
      <td className="text-end">
        <Variacao valor={acao.lucroPrejuizoPercentual} />
      </td>
      <td className="text-end">
        <button onClick={() => onVender(acao.sigla, acao.quantidade)} className="btn btn-sm btn-danger fw-bold py-0">
          VENDER
        </button>
      </td>
    </tr>
  )
}
