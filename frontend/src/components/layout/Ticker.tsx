import type { EventoNoticia } from '../../types'

const TEXTO_VAZIO = 'A aguardar notícias...'

export default function Ticker({ noticias }: { noticias: EventoNoticia[] }) {
  const texto = noticias.length > 0
    ? noticias.map(noticia => `[${noticia.siglaEmpresa}] ${noticia.titulo}`).join('  ✦  ')
    : TEXTO_VAZIO

  return (
    <div className="bg-black py-1 ticker text-verde">
      <span className="ticker-conteudo">{texto}</span>
    </div>
  )
}
