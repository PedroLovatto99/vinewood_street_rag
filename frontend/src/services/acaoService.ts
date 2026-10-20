import { post, requisitar } from './api'
import type { Carteira, Mensagem } from '../types'

export const buscarCarteira = (usuarioId: number) =>
  requisitar<Carteira>(`/acoes/${usuarioId}`)

export const comprarAcao = (usuarioId: number, sigla: string, quantidade: number) =>
  post<Mensagem>(`/acoes/${usuarioId}/comprar`, { sigla, quantidade })

export const venderAcao = (usuarioId: number, sigla: string, quantidade: number) =>
  post<Mensagem>(`/acoes/${usuarioId}/vender`, { sigla, quantidade })
