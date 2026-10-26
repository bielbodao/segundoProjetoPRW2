import axios from 'axios'

const filmesApi = axios.create({
  baseURL: 'https://6ade805e4e88f1bba4a52902.mockapi.io/filmes',
  headers: { 'Content-Type': 'application/json' },
})

export const listarFilmes = async () => {
  const response = await filmesApi.get('/')
  return response.data
}

export const buscarFilme = async (id) => {
  const response = await filmesApi.get(`/${encodeURIComponent(id)}`)
  return response.data
}

export const criarFilme = async (filme) => {
  const response = await filmesApi.post('/', filme)
  return response.data
}

export const atualizarFilme = async (id, filme) => {
  const response = await filmesApi.put(`/${encodeURIComponent(id)}`, filme)
  return response.data
}

export const apagarFilme = async (id) => {
  const response = await filmesApi.delete(`/${encodeURIComponent(id)}`)
  return response.data
}

export function mensagemErro(error) {
  if (error.response?.status === 404) return 'Filme não encontrado. Confira o ID e tente novamente.'
  if (error.response) return `A API retornou um erro (${error.response.status}). Tente novamente.`
  return 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.'
}