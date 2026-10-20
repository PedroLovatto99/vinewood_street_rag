export const formatarPreco = (valor: number) => `$${valor.toFixed(2)}`

export const formatarPercentual = (valor: number) => `${valor.toFixed(2)}%`

export function formatarHora(dataIso: string) {
  const data = new Date(dataIso)
  return `${data.getHours()}:${data.getMinutes().toString().padStart(2, '0')}`
}

export const formatarDataHora = (dataIso: string) => new Date(dataIso).toLocaleString()
