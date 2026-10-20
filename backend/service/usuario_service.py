from fastapi import HTTPException
from sqlalchemy import select

from database.models import Usuario
from utils.utils_functions import gerar_hash, conferir_senha

SALDO_INICIAL = 10000.0


def buscar_usuario(session, usuario_id, travar=False):
    usuario = session.get(Usuario, usuario_id, with_for_update=travar)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado no sistema.")
    return usuario


def registrar_usuario(session, dados):
    existente = session.scalar(select(Usuario).where(Usuario.email == dados.email))
    if existente:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado.")

    usuario = Usuario(
        nome=dados.nome,
        email=dados.email,
        senha=gerar_hash(dados.senha),
        saldo_caixa=SALDO_INICIAL,
    )
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return usuario


def logar_usuario(session, dados):
    usuario = session.scalar(select(Usuario).where(Usuario.email == dados.email))
    if not usuario or not conferir_senha(dados.senha, usuario.senha):
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos.")
    return usuario
