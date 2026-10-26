import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buscarFilme, mensagemErro } from '../services/filmesApi.js'

function Read() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [filme, setFilme] = useState(null)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    buscarFilme(id)
      .then((data) => { if (active) setFilme(data) })
      .catch((requestError) => { if (active) setError(mensagemErro(requestError)) })
      .finally(() => { if (active) setBusy(false) })
    return () => { active = false }
  }, [id])

  return (
    <section className="page">
      <p className="eyebrow">SUA COLEÇÃO / DETALHES</p>
      <h1>Detalhes do filme<span className="red-dot">.</span></h1>
      {error && <p className="message message-error" role="alert">{error}</p>}
      {busy ? (
        <p className="empty-state" role="status">Carregando filme...</p>
      ) : error ? null : filme ? (
        <div className="record-preview">
          <dl className="movie-details">
            <div><dt>ID</dt><dd>{filme.id}</dd></div>
            <div><dt>Nome</dt><dd>{filme.nome}</dd></div>
            <div><dt>Gênero</dt><dd>{filme.genero}</dd></div>
            <div><dt>Ano</dt><dd>{filme.ano}</dd></div>
          </dl>
        </div>
      ) : (
        <p className="message message-error" role="alert">Filme não encontrado.</p>
      )}
      <button className="button button-secondary" type="button" onClick={() => navigate('/')}>Cancelar</button>
    </section>
  )
}

export default Read