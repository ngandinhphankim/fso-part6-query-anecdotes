import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  }
}

export const getAnecdotes = async () => {
    const { data } = await axios.get(baseUrl)
    return data
}

export const createAnecdote = async content => {
    const newAnecdote = asObject(content)
    const { data } = await axios.post(baseUrl, newAnecdote)
    return data
}

export const updateAnecdote = async updatedAnecdote => {
  const { data } = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return data
}