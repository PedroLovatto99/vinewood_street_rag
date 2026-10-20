import type { ReactNode } from 'react'

interface Props {
  titulo: string
  tamanho?: string
  onFechar: () => void
  children: ReactNode
}

export default function Modal({ titulo, tamanho = '', onFechar, children }: Props) {
  return (
    <div className="modal show d-block fundo-modal">
      <div className={`modal-dialog modal-dialog-centered ${tamanho ? `modal-${tamanho}` : ''}`}>
        <div className="modal-content border-success bg-painel">
          <div className="modal-header border-secondary">
            <h5 className="modal-title fw-bold text-white">{titulo}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onFechar}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  )
}
