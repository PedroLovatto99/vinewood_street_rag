import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import Alerta from '../common/Alerta'
import Modal from '../common/Modal'
import type { Operacao } from '../../types'

interface Props {
  operacao: Operacao
  processando: boolean
  erro: string
  onConfirmar: (quantidade: number) => void
  onCancelar: () => void
}

export default function ModalQuantidade({ operacao, processando, erro, onConfirmar, onCancelar }: Props) {
  const [quantidade, setQuantidade] = useState('1')
  const comprando = operacao.tipo === 'comprar'

  const aoEnviar = (e: SyntheticEvent) => {
    e.preventDefault()
    onConfirmar(parseInt(quantidade, 10))
  }

  return (
    <Modal
      titulo={`${comprando ? 'Comprar' : 'Vender'} ações da ${operacao.sigla}`}
      onFechar={onCancelar}
    >
      <form onSubmit={aoEnviar}>
        <Alerta tipo="danger">{erro}</Alerta>

        {!comprando && (
          <p className="text-muted small">Você possui {operacao.maximo}x de [{operacao.sigla}].</p>
        )}

        <label className="form-label text-success fw-bold small">Quantidade</label>
        <input
          type="number"
          min="1"
          max={comprando ? undefined : (operacao.maximo ?? undefined)}
          className="form-control text-light bg-dark border-secondary mb-3"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
          required
          autoFocus
        />

        <div className="d-flex gap-2">
          <button type="button" onClick={onCancelar} className="btn btn-outline-secondary w-50">
            Cancelar
          </button>
          <button
            type="submit"
            className={`btn w-50 fw-bold ${comprando ? 'btn-success' : 'btn-danger'}`}
            disabled={processando}
          >
            {processando ? 'Processando...' : 'Confirmar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
