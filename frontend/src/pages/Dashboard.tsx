import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notificacao from '../components/common/Notificacao'
import Cabecalho from '../components/layout/Cabecalho'
import Ticker from '../components/layout/Ticker'
import Abas from '../components/layout/Abas'
import TabelaMercado from '../components/mercado/TabelaMercado'
import ListaNoticias from '../components/noticias/ListaNoticias'
import TabelaCarteira from '../components/carteira/TabelaCarteira'
import ModalEmpresa from '../components/empresa/ModalEmpresa'
import ModalQuantidade from '../components/operacao/ModalQuantidade'
import useUsuario from '../hooks/useUsuario'
import useMercado from '../hooks/useMercado'
import useNoticias from '../hooks/useNoticias'
import useCarteira from '../hooks/useCarteira'
import useOperacao from '../hooks/useOperacao'
import type { Aba, AbaId, Aviso, TipoOperacao } from '../types'

const ABAS: Aba[] = [
  { id: 'mercado', rotulo: 'Mercado' },
  { id: 'noticias', rotulo: 'Notícias' },
  { id: 'portfolio', rotulo: 'Portfólio' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { usuario, sair } = useUsuario()
  const logado = !!usuario

  const [abaAtiva, setAbaAtiva] = useState<AbaId>('mercado')
  const [empresaId, setEmpresaId] = useState<number | null>(null)
  const [aviso, setAviso] = useState<Aviso | null>(null)

  const { mercado } = useMercado()
  const { noticias } = useNoticias()
  const { saldo, acoes, recarregar: recarregarCarteira } = useCarteira(usuario?.id, sair)

  const fecharAviso = useCallback(() => setAviso(null), [])

  const aoConcluirOperacao = (tipo: TipoOperacao, mensagem: string) => {
    setAviso({ tipo: 'success', texto: mensagem })
    recarregarCarteira()
    if (tipo === 'comprar') setEmpresaId(null)
  }

  const { operacao, processando, erro, iniciar, cancelar, confirmar } = useOperacao(usuario?.id, aoConcluirOperacao)

  const deslogar = () => {
    sair()
    navigate('/')
  }

  const trocarAba = (aba: AbaId) => {
    if (aba === 'portfolio' && !logado) {
      setAviso({ tipo: 'warning', texto: 'ACESSO NEGADO: Inicie sessão para ver o seu portfólio.' })
      return
    }
    setAbaAtiva(aba)
  }

  return (
    <div className="bg-darker min-vh-100 pb-5">
      <Notificacao aviso={aviso} onFechar={fecharAviso} />

      <Cabecalho usuario={usuario} saldo={saldo} onSair={deslogar} onLogin={() => navigate('/')} />
      <Ticker noticias={noticias} />

      <main className="container my-4">
        <Abas abas={ABAS} ativa={abaAtiva} onTrocar={trocarAba} />

        <div className="p-4 rounded-bottom shadow bg-painel borda-verde" style={{ borderTop: 'none' }}>
          {abaAtiva === 'mercado' && <TabelaMercado mercado={mercado} onSelecionar={setEmpresaId} />}
          {abaAtiva === 'noticias' && <ListaNoticias noticias={noticias} />}
          {abaAtiva === 'portfolio' && (
            <TabelaCarteira acoes={acoes} onVender={(sigla, maximo) => iniciar('vender', sigla, maximo)} />
          )}
        </div>
      </main>

      {empresaId !== null && (
        <ModalEmpresa
          empresaId={empresaId}
          logado={logado}
          onComprar={sigla => iniciar('comprar', sigla)}
          onFechar={() => setEmpresaId(null)}
        />
      )}

      {operacao && (
        <ModalQuantidade
          operacao={operacao}
          processando={processando}
          erro={erro}
          onConfirmar={confirmar}
          onCancelar={cancelar}
        />
      )}
    </div>
  )
}
