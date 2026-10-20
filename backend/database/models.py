from sqlalchemy import create_engine, String, Double
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv
from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from datetime import datetime
import os


load_dotenv()

db_usuario = os.getenv("DB_USUARIO")
db_senha = os.getenv("DB_SENHA")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "3306")
db_nome = os.getenv("DB_NOME")

db = create_engine(
    f"mysql+mysqlconnector://{db_usuario}:{db_senha}@{db_host}:{db_port}/{db_nome}",
    pool_pre_ping=True,
)

class TipoImpacto(str, enum.Enum):
    POSITIVO = "POSITIVO"
    NEGATIVO = "NEGATIVO"
    NEUTRO = "NEUTRO"

Base = declarative_base(type_annotation_map={float: Double})


class Usuario(Base):
    __tablename__ = "usuarios"
    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    senha: Mapped[str] = mapped_column(String(255))
    saldo_caixa: Mapped[float]
    acoes: Mapped[list["Acao"]] = relationship(back_populates="usuario")

class Empresa(Base):
    __tablename__ = "empresas"
    id: Mapped[int] = mapped_column(primary_key=True)
    sigla: Mapped[str] = mapped_column(String(255), unique=True)
    nome: Mapped[str] = mapped_column(String(255))
    descricao: Mapped[str | None] = mapped_column(Text)
    preco_atual: Mapped[float]
    historico: Mapped[list["HistoricoPreco"]] = relationship(back_populates="empresa")
    noticias: Mapped[list["EventoNoticia"]] = relationship(back_populates="empresa")

class Acao(Base):
    __tablename__ = "acoes_compradas"
    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"))
    quantidade: Mapped[int]
    preco_medio_compra: Mapped[float]
    usuario: Mapped["Usuario"] = relationship(back_populates="acoes")
    empresa: Mapped["Empresa"] = relationship()

class HistoricoPreco(Base):
    __tablename__ = "historico_preco"
    id: Mapped[int] = mapped_column(primary_key=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"))
    preco: Mapped[float]
    data_hora: Mapped[datetime]
    empresa: Mapped["Empresa"] = relationship(back_populates="historico")

class EventoNoticia(Base):
    __tablename__ = "evento_noticia"
    id: Mapped[int] = mapped_column(primary_key=True)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresas.id"))
    titulo: Mapped[str] = mapped_column(String(255))
    conteudo_gerado: Mapped[str] = mapped_column(Text)
    impacto: Mapped[TipoImpacto]  
    percentual_variacao: Mapped[float]
    data_publicacao: Mapped[datetime]
    empresa: Mapped["Empresa"] = relationship(back_populates="noticias")