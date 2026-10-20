import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { UsuarioContext } from './UsuarioContext'
import type { Usuario } from '../types'

const CHAVE_USUARIO = 'vinewood_usuario'

function lerUsuarioSalvo(): Usuario | null {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIO) ?? 'null')
  } catch {
    return null
  }
}

export default function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(lerUsuarioSalvo)

  const entrar = useCallback((dados: Usuario) => {
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
    setUsuario(dados)
  }, [])

  const sair = useCallback(() => {
    localStorage.removeItem(CHAVE_USUARIO)
    setUsuario(null)
  }, [])

  const valor = useMemo(() => ({ usuario, entrar, sair }), [usuario, entrar, sair])

  return <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>
}
