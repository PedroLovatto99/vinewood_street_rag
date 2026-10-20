from sqlalchemy import select

from database.models import EventoNoticia
from utils.utils_functions import montar_noticia

LIMITE_NOTICIAS = 50


def listar_noticias(session):
    noticias = session.scalars(
        select(EventoNoticia).order_by(EventoNoticia.data_publicacao.desc()).limit(LIMITE_NOTICIAS)
    ).all()
    return [montar_noticia(noticia) for noticia in noticias]
