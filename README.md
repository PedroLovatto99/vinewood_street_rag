# 📈 Vinewood Street - Bolsa de valores
Um simulador Full-Stack da bolsa de valores de Los Santos. Você compra e vende ações (como Pißwasser, Ammu-Nation e Maze Bank), acompanha os gráficos e vê o mercado reagir a notícias geradas por Inteligência Artificial.

---

### 💻 Stack do Projeto

**Front-End:** React, TypeScript, Vite, React Router, Bootstrap 5 & Chart.js  
**Back-End:** Python 3.11 & FastAPI  
**Inteligência Artificial:** LangChain e Google Gemini API  
**Persistência/ORM:** SQLAlchemy  
**Banco de Dados Relacional:** MySQL  
**Banco de Dados Vetorial:** ChromaDB (Para memória da IA)  
**Embeddings:** Sentence Transformers (all-MiniLM-L6-v2)  
**Infraestrutura:** Docker & Nginx  

---

### O que o sistema faz?
* **Mercado Vivo:** As cotações flutuam automaticamente a cada 1 minuto.
* **Corretora Completa:** Sistema de login, saldo inicial de $10.000, compra, venda e cálculo de lucro/prejuízo.
* **Gráficos (Chart.js):** Histórico de preços das últimas 3 horas com indicadores de tendência.
* **Modo Visitante:** Acesso liberado para ver o mercado e as notícias, com bloqueio apenas de operações financeiras.
* **Atualização Automática:** O front busca mercado, notícias e carteira a cada 10 segundos.
* **Full Docker:** Front-end, Back-end e Banco de Dados sobem juntos com um único comando.

---

### Inteligência Artificial e RAG

A cada 1 minuto, a inteligência artificial, por meio do Gemini e do contexto via RAG, cria uma notícia que pode ser positiva, neutra ou negativa sobre uma empresa, impactando o valor das ações.

O contexto vem de um PDF com a lore das empresas de Los Santos (`backend/rag/dados.pdf`), que é dividido em pedaços, transformado em embeddings e guardado no ChromaDB na primeira execução.

| Impacto | Variação no preço |
|---------|-------------------|
| Positivo | de +2% a +12% |
| Negativo | de -12% a -2% |
| Neutro | de -1% a +1% |

---

### Requisitos

* **Docker** e **Docker Compose**.
* Uma chave de API do **Google Gemini** (disponível no Google AI Studio).

---

### Como Rodar (Modo Rápido)

**1. Clonar o repositório e entrar na pasta gerada**

```bash
git clone https://github.com/PedroLovatto99/vinewood_street.git
cd vinewood_street
```

**2. Configurar variáveis**

Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como base) e insira sua chave do Gemini:
```env
GOOGLE_API_KEY=sua_chave_aqui

DB_USUARIO=root
DB_SENHA=root
DB_NOME=vinewoodstreetdb
DB_HOST=localhost
DB_PORT=3307
```

**3. Subir o sistema**

Na raiz do projeto, rode o comando:
```bash
docker compose up --build
```

**4. Acessar**

Após o Docker finalizar o build, abra o navegador em:
```
http://localhost:8080
```

> Na primeira execução o backend baixa o modelo de embeddings e indexa o PDF, então as primeiras notícias aparecem depois de 1 ou 2 minutos.

---

### Rodar sem Docker (desenvolvimento)

**Banco de dados**
```bash
docker compose up db
```

**Back-end** (a partir da pasta `backend`)
```bash
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

**Front-end** (a partir da pasta `frontend`)
```bash
npm install
npm run dev
```
O Vite encaminha as chamadas de `/api` para `http://localhost:8000`.

---

### Estrutura do Projeto

```
vinewood_street/
├── docker-compose.yml
├── .env.example
├── backend/
│   ├── app.py              # Aplicação FastAPI e ciclo de vida
│   ├── controller/         # Rotas
│   ├── service/            # Regras de negócio (usuário, ações, empresas, notícias, bolsa)
│   ├── utils/              # Funções auxiliares
│   ├── dto/                # Schemas de entrada e saída
│   ├── database/           # Models e sessão do SQLAlchemy
│   ├── rag/                # Jornalista de IA, PDF e ChromaDB
│   └── dados.json          # Empresas e histórico iniciais
└── frontend/
    └── src/
        ├── pages/          # Auth e Dashboard
        ├── components/     # Componentes por área
        ├── hooks/          # Busca e atualização de dados
        ├── services/       # Chamadas à API
        ├── context/        # Usuário logado
        └── types/          # Tipos TypeScript
```

---

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Criar uma conta |
| POST | `/auth/login` | Fazer login |
| GET | `/empresas` | Listar as empresas do mercado |
| GET | `/empresas/{id}` | Detalhes, gráfico e notícias de uma empresa |
| GET | `/noticias` | Últimas notícias |
| GET | `/acoes/{usuario_id}` | Saldo e carteira do usuário |
| POST | `/acoes/{usuario_id}/comprar` | Comprar ações |
| POST | `/acoes/{usuario_id}/vender` | Vender ações |

---

## Documentação da API (Swagger)
Visualize e teste todos os endpoints em tempo real acessando:

http://localhost:8000/docs
