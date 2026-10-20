import {
  CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { formatarHora } from '../../utils/formatadores'
import type { HistoricoPreco } from '../../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const OPCOES: ChartOptions<'line'> = {
  responsive: true,
  animation: false,
  plugins: { legend: { display: false } },
}

function montarDados(historico: HistoricoPreco[], sigla: string): ChartData<'line'> {
  const valores = historico.map(ponto => ponto.preco)
  const subiu = (valores[valores.length - 1] || 0) >= (valores[0] || 0)

  return {
    labels: historico.map(ponto => formatarHora(ponto.dataHora)),
    datasets: [{
      label: sigla,
      data: valores,
      borderColor: subiu ? '#198754' : '#dc3545',
      borderWidth: 2,
      pointRadius: 1,
      tension: 0.1,
    }],
  }
}

interface Props {
  historico: HistoricoPreco[]
  sigla: string
}

export default function GraficoPreco({ historico, sigla }: Props) {
  return (
    <div className="p-2 rounded bg-escuro">
      <Line data={montarDados(historico, sigla)} options={OPCOES} />
    </div>
  )
}
