import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FormularioAuth from '../components/auth/FormularioAuth'
import useUsuario from '../hooks/useUsuario'
import { login, registrar } from '../services/authService'
import type { ErroApi } from '../services/api'
import type { DadosAuth } from '../types'

export default function Auth() {
  const navigate = useNavigate()
  const { usuario, entrar } = useUsuario()

  const [modoLogin, setModoLogin] = useState(true)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  if (usuario) return <Navigate to="/dashboard" />

  const alternarModo = () => {
    setModoLogin(!modoLogin)
    setErro('')
    setSucesso('')
  }

  const enviar = async ({ nome, email, senha }: DadosAuth) => {
    setCarregando(true)
    setErro('')
    setSucesso('')

    try {
      if (modoLogin) {
        entrar(await login(email, senha))
        navigate('/dashboard')
      } else {
        await registrar(nome, email, senha)
        setSucesso('Conta aprovada! Você recebeu $10.000 de bônus inicial. Faça login abaixo.')
        setModoLogin(true)
      }
    } catch (e) {
      const erroApi = e as ErroApi
      setErro(erroApi.status === 401 ? 'Acesso negado. E-mail ou palavra-passe incorretos.' : erroApi.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-darker">
      <main className="w-100" style={{ maxWidth: '400px', padding: '1rem' }}>
        <div className="card shadow-lg border-success border-top border-4 bg-dark">
          <div className="card-body p-5 text-center">
            <h1 className="display-5 fw-bold text-success mb-1">Vinewood Street</h1>
            <p className="text-light mb-4">
              {modoLogin ? 'Terminal de Corretores' : 'Registo de Novo Corretor'}
            </p>

            <FormularioAuth
              modoLogin={modoLogin}
              carregando={carregando}
              erro={erro}
              sucesso={sucesso}
              onEnviar={enviar}
              onAlternar={alternarModo}
              onVisitante={() => navigate('/dashboard')}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
