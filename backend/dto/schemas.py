from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel

from database.models import TipoImpacto


class Schema(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


class RegisterRequest(Schema):
    nome: str
    email: str
    senha: str


class LoginRequest(Schema):
    email: str
    senha: str


class UsuarioOut(Schema):
    id: int
    nome: str
    email: str


class AcaoRequest(Schema):
    sigla: str
    quantidade: int = Field(ge=1)


class AcaoCompradaOut(Schema):
    id: int
    sigla: str
    nome_empresa: str
    quantidade: int
    preco_medio_compra: float
    preco_atual_mercado: float
    lucro_prejuizo_percentual: float


class CarteiraOut(Schema):
    saldo_disponivel: float
    minhas_acoes: list[AcaoCompradaOut]



class HistoricoPrecoOut(Schema):
    preco: float
    data_hora: datetime


class EventoNoticiaOut(Schema):
    sigla_empresa: str
    titulo: str
    conteudo: str
    impacto: TipoImpacto
    data_publicacao: datetime


class EmpresaCardOut(Schema):
    id: int
    sigla: str
    nome: str
    preco_atual: float
    variacao_ultimas_24h: float = Field(alias="variacaoUltimas24h")


class EmpresaDetalheOut(Schema):
    id: int
    nome: str
    sigla: str
    descricao: str | None
    preco_atual: float
    grafico: list[HistoricoPrecoOut]
    noticias_recentes: list[EventoNoticiaOut]