import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { listarFilmes, mensagemErro } from '../services/filmesApi.js'

function Home() {
  const [filmes, setFilmes] = useState([])
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const notice = location.state?.notice

  useEffect(() => {
    let active = true
    listarFilmes()
      .then((data) => { if (active) setFilmes(data) })
      .catch((requestError) => { if (active) setError(mensagemErro(requestError)) })
      .finally(() => { if (active) setBusy(false) })
    return () => { active = false }
  }, [])

  const handleRetry = () => {
    setBusy(true)
    setError('')
    listarFilmes()
      .then(setFilmes)
      .catch((requestError) => setError(mensagemErro(requestError)))
      .finally(() => setBusy(false))
  }

  return (
    <section className="page home-page">
      <p className="eyebrow">SUA COLEÇÃO, DO SEU JEITO</p>
      <div className="page-heading-row">
        <div>
          <h1>Seus filmes<span className="red-dot">.</span></h1>
          <p className="home-intro">Explore sua coleção e escolha um título para ver os detalhes.</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => navigate('/criar')}>
          <span aria-hidden="true">+</span> Adicionar filme
        </button>
      </div>
      {notice && <p className="message message-success" role="status">{notice}</p>}
      {error && <p className="message message-error" role="alert">{error}</p>}
      {busy ? (
        <p className="empty-state" role="status">Carregando sua coleção...</p>
      ) : error ? (
        <button className="button button-secondary" type="button" onClick={handleRetry}>Tentar novamente</button>
      ) : filmes.length === 0 ? (
        <div className="empty-state">
          <strong>Sua coleção ainda está vazia.</strong>
          <span>Adicione um filme para começar.</span>
          <button className="button button-primary" type="button" onClick={() => navigate('/criar')}>Adicionar primeiro filme</button>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Nome</th></tr></thead>
            <tbody>
              {filmes.map((filme) => (
                <tr key={filme.id} className="movie-list-row">
                  <td className="id-cell"><Link to={`/ler/${filme.id}`}>{filme.id}</Link></td>
                  <td className="movie-name-cell"><Link to={`/ler/${filme.id}`}>{filme.nome}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Home