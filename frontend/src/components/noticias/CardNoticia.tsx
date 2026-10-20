import BadgeImpacto from '../common/BadgeImpacto'
import { formatarDataHora } from '../../utils/formatadores'
import type { EventoNoticia } from '../../types'

export default function CardNoticia({ noticia }: { noticia: EventoNoticia }) {
  return (
    <div className="mb-4 border-bottom border-secondary pb-3">
      <BadgeImpacto impacto={noticia.impacto} className="me-2" />
      <span className="fw-bold fs-5 text-verde">{noticia.siglaEmpresa}</span>
      <span className="fw-bold text-white fs-5"> - {noticia.titulo}</span>
      <p className="text-light mt-2 mb-0 fst-italic" style={{ opacity: 0.8 }}>"{noticia.conteudo}"</p>
      <small className="text-secondary">{formatarDataHora(noticia.dataPublicacao)}</small>
    </div>
  )
}
