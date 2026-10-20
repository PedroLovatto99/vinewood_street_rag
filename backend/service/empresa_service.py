from datetime import datetime, timedelta

from fastapi import HTTPException
from sqlalchemy import select

from database.models import Empresa, EventoNoticia, HistoricoPreco
from dto.schemas import EmpresaCardOut, EmpresaDetalheOut, HistoricoPrecoOut
from utils.utils_functions import HORAS_GRAFICO, calcular_variacao_3h, carregar_empresas, montar_noticia

LIMITE_NOTICIAS_EMPRESA = 10


def popular_banco(session):
    if session.scalar(select(Empresa.id).limit(1)) is not None:
        return

    agora = datetime.now()
    for dados in carregar_empresas():
        empresa = Empresa(
            sigla=dados["sigla"],
            nome=dados["nome"],
            descricao=dados["descricao"],
            preco_atual=dados["preco_atual"],
        )
        empresa.historico = [
            HistoricoPreco(preco=ponto["preco"], data_hora=agora - timedelta(minutes=ponto["minutos_atras"]))
            for ponto in dados["historico"]
        ]
        session.add(empresa)
    session.commit()


def buscar_empresa_por_sigla(session, sigla):
    empresa = session.scalar(select(Empresa).where(Empresa.sigla == sigla))
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada em Los Santos!")
    return empresa


def listar_empresas(session):
    empresas = session.scalars(select(Empresa).order_by(Empresa.id)).all()
    return [
        EmpresaCardOut(
            id=empresa.id,
            sigla=empresa.sigla,
            nome=empresa.nome,
            preco_atual=empresa.preco_atual,
            variacao_ultimas_24h=calcular_variacao_3h(session, empresa),
        )
        for empresa in empresas
    ]


def detalhar_empresa(session, empresa_id):
    empresa = session.get(Empresa, empresa_id)
    if not empresa:
        raise HTTPException(status_code=404, detail="Empresa não encontrada")

    limite = datetime.now() - timedelta(hours=HORAS_GRAFICO)
    historico = session.scalars(
        select(HistoricoPreco)
        .where(HistoricoPreco.empresa_id == empresa.id, HistoricoPreco.data_hora > limite)
        .order_by(HistoricoPreco.data_hora.asc())
    ).all()
    noticias = session.scalars(
        select(EventoNoticia)
        .where(EventoNoticia.empresa_id == empresa.id)
        .order_by(EventoNoticia.data_publicacao.desc())
        .limit(LIMITE_NOTICIAS_EMPRESA)
    ).all()

    return EmpresaDetalheOut(
        id=empresa.id,
        nome=empresa.nome,
        sigla=empresa.sigla,
        descricao=empresa.descricao,
        preco_atual=empresa.preco_atual,
        grafico=[HistoricoPrecoOut(preco=ponto.preco, data_hora=ponto.data_hora) for ponto in historico],
        noticias_recentes=[montar_noticia(noticia) for noticia in noticias],
    )
