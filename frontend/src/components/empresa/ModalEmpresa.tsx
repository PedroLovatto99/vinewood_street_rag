import Modal from '../common/Modal'
import GraficoPreco from './GraficoPreco'
import PainelPreco from './PainelPreco'
import UltimaNoticia from './UltimaNoticia'
import useEmpresaDetalhe from '../../hooks/useEmpresaDetalhe'

interface Props {
  empresaId: number
  logado: boolean
  onComprar: (sigla: string) => void
  onFechar: () => void
}

export default function ModalEmpresa({ empresaId, logado, onComprar, onFechar }: Props) {
  const { empresa } = useEmpresaDetalhe(empresaId)

  if (!empresa) {
    return (
      <Modal titulo="Carregando..." tamanho="lg" onFechar={onFechar}>
        <p className="text-muted mb-0">Buscando dados da empresa...</p>
      </Modal>
    )
  }

  return (
    <Modal titulo={`${empresa.nome} (${empresa.sigla})`} tamanho="lg" onFechar={onFechar}>
      <div className="row">
        <div className="col-md-8">
          <p className="text-muted small mb-2">{empresa.descricao}</p>
          <GraficoPreco historico={empresa.grafico} sigla={empresa.sigla} />
        </div>
        <PainelPreco
          precoAtual={empresa.precoAtual}
          logado={logado}
          onComprar={() => onComprar(empresa.sigla)}
        />
      </div>
      {empresa.noticiasRecentes.length > 0 && (
        <UltimaNoticia noticia={empresa.noticiasRecentes[0]} />
      )}
    </Modal>
  )
}
