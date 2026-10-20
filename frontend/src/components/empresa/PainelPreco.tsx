import { formatarPreco } from '../../utils/formatadores'

interface Props {
  precoAtual: number
  logado: boolean
  onComprar: () => void
}

export default function PainelPreco({ precoAtual, logado, onComprar }: Props) {
  return (
    <div className="col-md-4 d-flex flex-column justify-content-center">
      <div className="p-3 rounded mb-3 text-center border border-secondary bg-escuro">
        <span className="d-block small fw-bold text-muted">Preço Atual</span>
        <span className="fs-2 fw-bold text-white">{formatarPreco(precoAtual)}</span>
      </div>
      {logado ? (
        <button onClick={onComprar} className="btn btn-success btn-lg fw-bold w-100">COMPRAR</button>
      ) : (
        <div className="alert alert-warning small text-center p-2 mb-0">Inicie sessão para negociar.</div>
      )}
    </div>
  )
}
