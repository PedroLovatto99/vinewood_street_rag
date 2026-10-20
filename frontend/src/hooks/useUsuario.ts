import { useContext } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'

export default function useUsuario() {
  const contexto = useContext(UsuarioContext)
  if (!contexto) throw new Error('useUsuario precisa estar dentro de UsuarioProvider')
  return contexto
}
