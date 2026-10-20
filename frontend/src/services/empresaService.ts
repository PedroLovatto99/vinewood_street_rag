import { requisitar } from './api'
import type { EmpresaCard, EmpresaDetalhe } from '../types'

export const listarEmpresas = () => requisitar<EmpresaCard[]>('/empresas')

export const buscarEmpresa = (id: number) => requisitar<EmpresaDetalhe>(`/empresas/${id}`)
