import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import UsuarioProvider from './context/UsuarioProvider'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  )
}
