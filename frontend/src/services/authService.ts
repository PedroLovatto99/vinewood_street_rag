import { post } from './api'
import type { Usuario } from '../types'

export const login = (email: string, senha: string) =>
  post<Usuario>('/auth/login', { email, senha })

export const registrar = (nome: string, email: string, senha: string) =>
  post<Usuario>('/auth/register', { nome, email, senha })
