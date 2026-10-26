import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieForm from './MovieForm.jsx'
import { criarFilme, mensagemErro } from '../services/filmesApi.js'

const emptyMovie = { nome: '', genero: '', ano: '' }

function Create() {
  const [values, setValues] = useState(emptyMovie)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await criarFilme({ ...values, ano: String(values.ano) })
      navigate('/', { state: { notice: 'Filme cadastrado com sucesso.' } })
    } catch (requestError) {
      setError(mensagemErro(requestError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page">
      <p className="eyebrow">CATÁLOGO / NOVO REGISTRO</p>
      <h1>Criar filme<span className="red-dot">.</span></h1>
      <p className="page-intro">Preencha os dados para incluir um filme no catálogo.</p>
      {error && <p className="message message-error" role="alert">{error}</p>}
      <MovieForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Criar"
        busy={busy}
        onCancel={() => navigate('/')}
      />
    </section>
  )
}

export default Create