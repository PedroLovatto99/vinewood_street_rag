from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db_sessao import Session
from database.models import Base, db
from rag.jornalista import iniciar_sistema
from controller.rotas import rota_auth, rota_acoes, rota_empresas, rota_noticias
from service.empresa_service import popular_banco
from service.bolsa_service import iniciar_bolsa, parar_bolsa_thread


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(db)
    with Session() as session:
        popular_banco(session)
    iniciar_sistema()
    iniciar_bolsa()
    yield
    parar_bolsa_thread()


app = FastAPI(title="Vinewood Street", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rota_auth)
app.include_router(rota_acoes)
app.include_router(rota_empresas)
app.include_router(rota_noticias)
