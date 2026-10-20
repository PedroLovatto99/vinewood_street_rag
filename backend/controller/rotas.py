from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.db_sessao import pegar_sessao
from dto.schemas import (
    AcaoRequest,
    CarteiraOut,
    EmpresaCardOut,
    EmpresaDetalheOut,
    EventoNoticiaOut,
    LoginRequest,
    RegisterRequest,
    UsuarioOut,
)
from service.acao_service import buscar_carteira, comprar_acao, vender_acao
from service.empresa_service import detalhar_empresa, listar_empresas
from service.evento_noticia_service import listar_noticias
from service.usuario_service import logar_usuario, registrar_usuario

rota_auth = APIRouter(prefix="/auth", tags=["auth"])
rota_acoes = APIRouter(prefix="/acoes", tags=["acoes"])
rota_empresas = APIRouter(prefix="/empresas", tags=["empresas"])
rota_noticias = APIRouter(prefix="/noticias", tags=["noticias"])


@rota_auth.post("/register", response_model=UsuarioOut, status_code=201)
def registrar(dados: RegisterRequest, session: Session = Depends(pegar_sessao)):
    return registrar_usuario(session, dados)


@rota_auth.post("/login", response_model=UsuarioOut)
def login(dados: LoginRequest, session: Session = Depends(pegar_sessao)):
    return logar_usuario(session, dados)


@rota_acoes.get("/{usuario_id}", response_model=CarteiraOut)
def ver_carteira(usuario_id: int, session: Session = Depends(pegar_sessao)):
    return buscar_carteira(session, usuario_id)


@rota_acoes.post("/{usuario_id}/comprar", status_code=201)
def comprar(usuario_id: int, dados: AcaoRequest, session: Session = Depends(pegar_sessao)):
    comprar_acao(session, usuario_id, dados)
    return {"mensagem": "Ação/ações comprada(s) com sucesso!"}


@rota_acoes.post("/{usuario_id}/vender", status_code=201)
def vender(usuario_id: int, dados: AcaoRequest, session: Session = Depends(pegar_sessao)):
    vender_acao(session, usuario_id, dados)
    return {"mensagem": "Ação/ações vendida(s) com sucesso!"}


@rota_empresas.get("", response_model=list[EmpresaCardOut])
def listar(session: Session = Depends(pegar_sessao)):
    return listar_empresas(session)


@rota_empresas.get("/{empresa_id}", response_model=EmpresaDetalheOut)
def detalhes(empresa_id: int, session: Session = Depends(pegar_sessao)):
    return detalhar_empresa(session, empresa_id)


@rota_noticias.get("", response_model=list[EventoNoticiaOut])
def noticias(session: Session = Depends(pegar_sessao)):
    return listar_noticias(session)
