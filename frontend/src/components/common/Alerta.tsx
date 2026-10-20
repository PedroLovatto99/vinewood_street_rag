interface Props {
  tipo: 'success' | 'danger'
  children: string
}

export default function Alerta({ tipo, children }: Props) {
  if (!children) return null
  return <div className={`alert alert-${tipo} small text-start`}>{children}</div>
}
