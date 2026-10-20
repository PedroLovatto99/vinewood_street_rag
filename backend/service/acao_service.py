from fastapi import HTTPException
from sqlalchemy import select

from database.models import Acao
from dto.schemas import CarteiraOut
from service.empresa_service import buscar_empresa_por_sigla
from service.usuario_service import buscar_usuario
from utils.utils_functions import montar_acao


def buscar_carteira(session, usuario_id):
    usuario = buscar_usuario(session, usuario_id)
    acoes = [montar_acao(acao) for acao in usuario.acoes]
    return CarteiraOut(saldo_disponivel=usuario.saldo_caixa, minhas_acoes=acoes)


def comprar_acao(session, usuario_id, dados):
    usuario = buscar_usuario(session, usuario_id, travar=True)
    empresa = buscar_empresa_por_sigla(session, dados.sigla)

    custo_total = round(empresa.preco_atual * dados.quantidade, 2)
    if usuario.saldo_caixa < custo_total:
        raise HTTPException(status_code=400, detail="Saldo insuficiente!")

    usuario.saldo_caixa = round(usuario.saldo_caixa - custo_total, 2)

    acao = session.scalar(
        select(Acao).where(Acao.usuario_id == usuario.id, Acao.empresa_id == empresa.id)
    )
    if acao:
        total_investido = acao.preco_medio_compra * acao.quantidade + custo_total
        acao.quantidade += dados.quantidade
        acao.preco_medio_compra = round(total_investido / acao.quantidade, 2)
    else:
        session.add(Acao(
            usuario_id=usuario.id,
            empresa_id=empresa.id,
            quantidade=dados.quantidade,
            preco_medio_compra=empresa.preco_atual,
        ))

    session.commit()


def vender_acao(session, usuario_id, dados):
    usuario = buscar_usuario(session, usuario_id, travar=True)
    empresa = buscar_empresa_por_sigla(session, dados.sigla)

    acao = session.scalar(
        select(Acao).where(Acao.usuario_id == usuario.id, Acao.empresa_id == empresa.id)
    )
    if not acao:
        raise HTTPException(status_code=400, detail="Você não possui ações desta empresa para vender.")
    if acao.quantidade < dados.quantidade:
        raise HTTPException(status_code=400, detail="Você está tentando vender mais ações do que possui!")

    usuario.saldo_caixa = round(usuario.saldo_caixa + empresa.preco_atual * dados.quantidade, 2)

    acao.quantidade -= dados.quantidade
    if acao.quantidade == 0:
        session.delete(acao)

    session.commit()
