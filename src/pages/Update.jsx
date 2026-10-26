import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieForm from './MovieForm.jsx'
import { atualizarFilme, buscarFilme, mensagemErro } from '../services/filmesApi.js'

function Update() {
  const [id, setId] = useState('')
  const [filme, setFilme] = useState(null)
  const [values, setValues] = useState({ nome: '', genero: '', ano: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const loadMovie = async (movieId) => {
    setError('')
    setFilme(null)
    setBusy(true)
    try {
      const result = await buscarFilme(movieId.trim())
      setFilme(result)
      setValues({ nome: result.nome ?? '', genero: result.genero ?? '', ano: result.ano ?? '' })
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

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await atualizarFilme(filme.id, { ...values, ano: String(values.ano) })
      navigate('/', { state: { notice: 'Filme atualizado com sucesso.' } })
    } catch (requestError) {
      setError(mensagemErro(requestError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page">
      <p className="eyebrow">CATÁLOGO / EDIÇÃO</p>
      <h1>Alterar filme<span className="red-dot">.</span></h1>
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
        <div className="conditional-form">
          <p className="record-caption">Editando filme <strong>#{filme.id}</strong></p>
          <MovieForm values={values} onChange={handleChange} onSubmit={handleUpdate} submitLabel="Alterar" busy={busy} />
        </div>
      )}
    </section>
  )
}

export default Update