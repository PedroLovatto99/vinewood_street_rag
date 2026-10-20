interface Props {
  rotulo: string
  tipo?: string
  valor: string
  onChange: (valor: string) => void
  placeholder?: string
  className?: string
}

export default function CampoFormulario({
  rotulo, tipo = 'text', valor, onChange, placeholder, className = 'mb-3',
}: Props) {
  return (
    <div className={`${className} text-start`}>
      <label className="form-label text-success fw-bold small">{rotulo}</label>
      <input
        type={tipo}
        className="form-control text-light bg-dark border-secondary"
        placeholder={placeholder}
        value={valor}
        onChange={e => onChange(e.target.value)}
        required
      />
    </div>
  )
}
