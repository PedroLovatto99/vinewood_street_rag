import PainelUsuario from './PainelUsuario'
import type { Usuario } from '../../types'

interface Props {
  usuario: Usuario | null
  saldo: number | null
  onSair: () => void
  onLogin: () => void
}

export default function Cabecalho({ usuario, saldo, onSair, onLogin }: Props) {
  return (
    <header className="p-3 shadow-sm bg-verde">
      <div className="container d-flex justify-content-between align-items-center">
        <div>
          <h1 className="display-6 fw-bold text-white mb-0">VINEWOOD STREET</h1>
          <p className="text-dark fw-bold mb-0 small">LIDANDO COM OS ALTOS E BAIXOS DA VIDA</p>
        </div>
        <PainelUsuario usuario={usuario} saldo={saldo} onSair={onSair} onLogin={onLogin} />
      </div>
    </header>
  )
}
