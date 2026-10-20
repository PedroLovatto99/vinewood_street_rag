import { formatarPreco } from '../../utils/formatadores'
import type { Usuario } from '../../types'

interface Props {
  usuario: Usuario | null
  saldo: number | null
  onSair: () => void
  onLogin: () => void
}

export default function PainelUsuario({ usuario, saldo, onSair, onLogin }: Props) {
  return (
    <div className="p-2 rounded text-end bg-escuro" style={{ minWidth: '150px' }}>
      {usuario ? (
        <>
          <span className="small d-block fw-bold text-muted">Meu Saldo</span>
          <span className="fs-4 fw-bold text-white">{saldo !== null ? formatarPreco(saldo) : '...'}</span>
          <button onClick={onSair} className="btn btn-sm btn-outline-danger d-block w-100 mt-2">Sair</button>
        </>
      ) : (
        <>
          <span className="fs-5 fw-bold text-white d-block mb-2">Acesso Visitante</span>
          <button onClick={onLogin} className="btn btn-sm btn-outline-success w-100">Fazer Login</button>
        </>
      )}
    </div>
  )
}
