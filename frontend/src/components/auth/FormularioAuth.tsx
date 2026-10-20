import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import Alerta from '../common/Alerta'
import CampoFormulario from '../common/CampoFormulario'
import type { DadosAuth } from '../../types'

interface Props {
  modoLogin: boolean
  carregando: boolean
  erro: string
  sucesso: string
  onEnviar: (dados: DadosAuth) => void
  onAlternar: () => void
  onVisitante: () => void
}

export default function FormularioAuth({
  modoLogin, carregando, erro, sucesso, onEnviar, onAlternar, onVisitante,
}: Props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const aoEnviar = (e: SyntheticEvent) => {
    e.preventDefault()
    onEnviar({ nome, email, senha })
    setSenha('')
  }

  return (
    <form onSubmit={aoEnviar}>
      <Alerta tipo="danger">{erro}</Alerta>
      <Alerta tipo="success">{sucesso}</Alerta>

      {!modoLogin && (
        <CampoFormulario
          rotulo="Nome Completo"
          valor={nome}
          onChange={setNome}
          placeholder="Ex: Trevor Philips"
        />
      )}

      <CampoFormulario
        rotulo="E-mail Corporativo"
        tipo="email"
        valor={email}
        onChange={setEmail}
        placeholder="trevor@lsmail.com"
      />

      <CampoFormulario
        rotulo="Palavra-passe"
        tipo="password"
        valor={senha}
        onChange={setSenha}
        placeholder="••••••••"
        className="mb-4"
      />

      <button className="btn btn-success w-100 py-2 fw-bold" type="submit" disabled={carregando}>
        {carregando ? 'Processando...' : (modoLogin ? 'Acessar Sistema' : 'Criar Conta')}
      </button>

      <div className="mt-4">
        <button type="button" onClick={onAlternar} className="btn btn-link text-success text-decoration-none small fw-bold p-0">
          {modoLogin ? 'Não possui credenciais? Solicitar Acesso' : 'Já possui uma conta? Fazer Login'}
        </button>
      </div>

      <div className="mt-3">
        <button type="button" onClick={onVisitante} className="btn btn-outline-secondary w-100 py-2 fw-bold">
          Acessar como Visitante
        </button>
      </div>
    </form>
  )
}
