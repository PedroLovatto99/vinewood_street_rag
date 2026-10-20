import type { Aba, AbaId } from '../../types'

interface Props {
  abas: Aba[]
  ativa: AbaId
  onTrocar: (aba: AbaId) => void
}

export default function Abas({ abas, ativa, onTrocar }: Props) {
  return (
    <ul className="nav nav-tabs mb-0" style={{ borderBottomColor: '#7b9e57' }}>
      {abas.map(aba => (
        <li className="nav-item" key={aba.id}>
          <button
            onClick={() => onTrocar(aba.id)}
            className="nav-link border-0 fw-bold"
            style={{
              color: ativa === aba.id ? '#ffffff' : '#9ca3af',
              backgroundColor: ativa === aba.id ? '#242424' : '#141414',
              borderTop: ativa === aba.id ? '2px solid #7b9e57' : 'none',
              borderRadius: '4px 4px 0 0',
            }}
          >
            {aba.rotulo}
          </button>
        </li>
      ))}
    </ul>
  )
}
