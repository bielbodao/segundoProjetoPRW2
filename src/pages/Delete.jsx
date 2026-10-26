import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apagarFilme, buscarFilme, mensagemErro } from '../services/filmesApi.js'

function Delete() {
  const [id, setId] = useState('')
  const [filme, setFilme] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const loadMovie = async (movieId) => {
    setError('')
    setFilme(null)
    setBusy(true)
    try {
      setFilme(await buscarFilme(movieId.trim()))
    } catch (requestError) {
      setError(mensagemErro(requestError))
    } finally {
      setBusy(false)
    }
  }

  const handleSearch = (event) => {
    event.preventDefault()
    loadMovie(id)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(`Apagar "${filme.nome}" (ID ${filme.id})? Esta ação não pode ser desfeita.`)
    if (!confirmed) return

    setError('')
    setBusy(true)
    try {
      await apagarFilme(filme.id)
      navigate('/', { state: { notice: 'Filme apagado com sucesso.' } })
    } catch (requestError) {
      setError(mensagemErro(requestError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page">
      <p className="eyebrow">CATÁLOGO / REMOÇÃO</p>
      <h1>Apagar filme<span className="red-dot">.</span></h1>
      <form className="lookup-form" onSubmit={handleSearch}>
        <label className="field lookup-field">
          <span>ID do filme</span>
          <input type="text" inputMode="numeric" value={id} onChange={(event) => setId(event.target.value)} required />
        </label>
        <div className="lookup-actions">
          <button className="button button-primary" type="submit" disabled={busy}>{busy ? 'Procurando...' : 'Procurar'}</button>
          <button className="button button-secondary" type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
      {error && <p className="message message-error" role="alert">{error}</p>}
      {error && <button className="button button-secondary error-home-button" type="button" onClick={() => navigate('/')}>Voltar para Início</button>}
      {filme && (
        <div className="record-preview">
          <p className="record-caption">Confirme o cadastro antes de apagar:</p>
          <dl className="movie-details">
            <div><dt>ID</dt><dd>{filme.id}</dd></div>
            <div><dt>Nome</dt><dd>{filme.nome}</dd></div>
            <div><dt>Gênero</dt><dd>{filme.genero}</dd></div>
            <div><dt>Ano</dt><dd>{filme.ano}</dd></div>
          </dl>
          <button className="button button-danger" type="button" onClick={handleDelete} disabled={busy}>
            {busy ? 'Apagando...' : 'Apagar este filme'}
          </button>
        </div>
      )}
    </section>
  )
}

export default Delete