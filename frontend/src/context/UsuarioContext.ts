import { createContext } from 'react'
import type { Usuario } from '../types'

export interface UsuarioContextValor {
  usuario: Usuario | null
  entrar: (usuario: Usuario) => void
  sair: () => void
}

export const UsuarioContext = createContext<UsuarioContextValor | null>(null)
