import os
from dotenv import load_dotenv
import threading
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_community.embeddings import HuggingFaceEmbeddings

load_dotenv()

chain = None
is_ready = False
lock = threading.Lock()


def inicializar_jornalista():

    global chain, is_ready

    PERSIST_DIR = "rag/chroma_db"
    PDF_FILE = "rag/dados.pdf"
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    

    if os.path.exists(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        vectorstore = Chroma(persist_directory=PERSIST_DIR, embedding_function=embedding_model)

    else:
        loader = PyPDFLoader(PDF_FILE)
        docs = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        print(f"Total de pedaços para processar: {len(splits)}")

        vectorstore = Chroma.from_documents(
            documents=splits,
            embedding=embedding_model,
            persist_directory=PERSIST_DIR
        )

    retriever = vectorstore.as_retriever()

    llm = ChatGoogleGenerativeAI(model="gemini-3-flash-preview", temperature=0.8)

    template = """
    Você é um âncora da Weazel News em Los Santos.
    Crie uma notícia curta sobre a empresa pedida, baseada no impacto solicitado.

    CONTEXTO RECUPERADO (use como base para a notícia):
    {context}

    PEDIDO:
    {assunto}

    DIRETRIZES:
    1. Não use asteriscos nem markdown.
    2. Escreva em uma única linha, no formato: título | texto
    3. Não escreva as palavras MANCHETE ou CONTEÚDO.
    4. O texto deve ter no máximo 3 frases.

    Exemplo: Pißwasser dispara na bolsa | Os investidores comemoram o recorde de vendas da cervejaria em Los Santos.
    """

    prompt = PromptTemplate.from_template(template)

    nova_chain = (
        {"context": retriever, "assunto": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    with lock:
        chain = nova_chain
        is_ready = True


def iniciar_sistema():

    if not is_ready:
        thread_jornalista = threading.Thread(target=inicializar_jornalista, daemon=True)
        thread_jornalista.start()


def gerar_noticia(empresa, impacto):
    if not is_ready:
        return None

    return chain.invoke(f"Escreva uma notícia com impacto {impacto} sobre a empresa {empresa}.")
