import CardNoticia from './CardNoticia'
import type { EventoNoticia } from '../../types'

export default function ListaNoticias({ noticias }: { noticias: EventoNoticia[] }) {
  return (
    <div>
      <h4 className="mb-4 text-verde">Notícias de Los Santos</h4>
      {noticias.length === 0 ? (
        <p className="text-muted">A aguardar notícias...</p>
      ) : noticias.map(noticia => (
        <CardNoticia key={`${noticia.siglaEmpresa}-${noticia.dataPublicacao}`} noticia={noticia} />
      ))}
    </div>
  )
}
