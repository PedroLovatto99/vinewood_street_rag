import random
import threading
from datetime import datetime

from sqlalchemy import select

from database.db_sessao import Session
from database.models import Empresa, EventoNoticia, HistoricoPreco, TipoImpacto
from rag.jornalista import gerar_noticia
from utils.utils_functions import calcular_percentual, separar_noticia

INTERVALO_BOLSA = 60

parar_bolsa = threading.Event()


def gerar_evento_aleatorio(session):
    empresas = session.scalars(select(Empresa)).all()
    if not empresas:
        return

    empresa = random.choice(empresas)
    impacto = random.choice(list(TipoImpacto))

    noticia_bruta = gerar_noticia(empresa.nome, impacto.value)
    if not noticia_bruta:
        return

    noticia = separar_noticia(noticia_bruta)
    if not noticia:
        return
    titulo, conteudo = noticia

    variacao = calcular_percentual(impacto)
    novo_preco = round(empresa.preco_atual * (1 + variacao / 100), 2)
    agora = datetime.now()

    empresa.preco_atual = novo_preco
    session.add(HistoricoPreco(empresa_id=empresa.id, preco=novo_preco, data_hora=agora))
    session.add(EventoNoticia(
        empresa_id=empresa.id,
        titulo=titulo[:255],
        conteudo_gerado=conteudo,
        impacto=impacto,
        percentual_variacao=variacao,
        data_publicacao=agora,
    ))
    session.commit()


def laco_bolsa():
    while not parar_bolsa.wait(INTERVALO_BOLSA):
        session = Session()
        try:
            gerar_evento_aleatorio(session)
        except Exception as erro:
            session.rollback()
            print(f"Erro ao gerar evento da bolsa: {erro}")
        finally:
            session.close()


def iniciar_bolsa():
    parar_bolsa.clear()
    thread_bolsa = threading.Thread(target=laco_bolsa, daemon=True)
    thread_bolsa.start()


def parar_bolsa_thread():
    parar_bolsa.set()
