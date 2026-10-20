import json
import random
import re
from datetime import datetime, timedelta

import bcrypt
from sqlalchemy import select

from database.models import HistoricoPreco, TipoImpacto
from dto.schemas import AcaoCompradaOut, EventoNoticiaOut

HORAS_GRAFICO = 3


def carregar_empresas():
    with open("dados.json", "r", encoding="utf-8") as arquivo:
        return json.load(arquivo)


def gerar_hash(senha):
    return bcrypt.hashpw(senha.encode()[:72], bcrypt.gensalt()).decode()


def conferir_senha(senha, hash_salvo):
    return bcrypt.checkpw(senha.encode()[:72], hash_salvo.encode())


def calcular_variacao_3h(session, empresa):
    limite = datetime.now() - timedelta(hours=HORAS_GRAFICO)

    preco_antigo = session.scalar(
        select(HistoricoPreco.preco)
        .where(HistoricoPreco.empresa_id == empresa.id, HistoricoPreco.data_hora > limite)
        .order_by(HistoricoPreco.data_hora.asc())
        .limit(1)
    )
    if preco_antigo is None:
        preco_antigo = empresa.preco_atual
    if preco_antigo == 0:
        return 0.0

    return ((empresa.preco_atual - preco_antigo) / preco_antigo) * 100.0


def calcular_percentual(impacto):
    if impacto == TipoImpacto.POSITIVO:
        return 2.0 + 10.0 * random.random()
    if impacto == TipoImpacto.NEGATIVO:
        return -12.0 + 10.0 * random.random()
    return -1.0 + 2.0 * random.random()


def separar_noticia(texto):
    limpo = texto.replace("*", "")
    limpo = re.sub(r"(?i)\b(manchete|conteúdo|conteudo)\s*[:|]\s*", "", limpo).strip()

    if "|" in limpo:
        titulo, conteudo = limpo.split("|", 1)
    else:
        partes = re.split(r"\n+", limpo, maxsplit=1)
        if len(partes) < 2:
            return None
        titulo, conteudo = partes

    titulo, conteudo = titulo.strip(), conteudo.strip()
    if not titulo or not conteudo:
        return None
    return titulo, conteudo


def montar_acao(acao):
    preco_atual = acao.empresa.preco_atual
    preco_pago = acao.preco_medio_compra

    return AcaoCompradaOut(
        id=acao.id,
        sigla=acao.empresa.sigla,
        nome_empresa=acao.empresa.nome,
        quantidade=acao.quantidade,
        preco_medio_compra=preco_pago,
        preco_atual_mercado=preco_atual,
        lucro_prejuizo_percentual=((preco_atual - preco_pago) / preco_pago) * 100.0,
    )


def montar_noticia(noticia):
    return EventoNoticiaOut(
        sigla_empresa=noticia.empresa.sigla,
        titulo=noticia.titulo,
        conteudo=noticia.conteudo_gerado,
        impacto=noticia.impacto,
        data_publicacao=noticia.data_publicacao,
    )
