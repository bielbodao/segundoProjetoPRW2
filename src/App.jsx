import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Read from './pages/Read.jsx'
import Create from './pages/Create.jsx'
import Update from './pages/Update.jsx'
import Delete from './pages/Delete.jsx'
import './catalog.css'

const navigation = [
  { to: '/', label: 'Início', end: true },
  { to: '/criar', label: 'Criar' },
  { to: '/alterar', label: 'Alterar' },
  { to: '/apagar', label: 'Apagar' },
]

function NotFound() {
  return (
    <section className="page">
      <h1>Página não encontrada</h1>
      <p>O endereço informado não corresponde a uma página do catálogo.</p>
    </section>
  )
}

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" end>
          <img className="brand-mark" src="/reelvault-mark.svg" alt="" />
          <span>ReelVault</span>
        </NavLink>
        <nav className="main-nav" aria-label="Navegação principal">
          {navigation.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ler/:id" element={<Read />} />
          <Route path="/ler" element={<Navigate to="/" replace />} />
          <Route path="/criar" element={<Create />} />
          <Route path="/alterar" element={<Update />} />
          <Route path="/apagar" element={<Delete />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">ReelVault <span>·</span> Sua coleção de filmes</footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
