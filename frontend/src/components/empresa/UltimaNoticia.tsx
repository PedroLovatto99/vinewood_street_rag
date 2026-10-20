import BadgeImpacto from '../common/BadgeImpacto'
import type { EventoNoticia } from '../../types'

export default function UltimaNoticia({ noticia }: { noticia: EventoNoticia }) {
  return (
    <div className="mt-3 bg-dark p-2 rounded border border-secondary">
      <BadgeImpacto impacto={noticia.impacto} className="mb-1" />
      <p className="mb-0 small fst-italic text-light" style={{ opacity: 0.9 }}>{noticia.titulo}</p>
    </div>
  )
}
