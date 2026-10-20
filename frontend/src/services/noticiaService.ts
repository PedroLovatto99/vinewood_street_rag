import { requisitar } from './api'
import type { EventoNoticia } from '../types'

export const listarNoticias = () => requisitar<EventoNoticia[]>('/noticias')
