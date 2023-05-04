import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdote"
import { setNotiAction, useNotiDispatch } from "./NotiContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotiDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate(content)
    dispatch(setNotiAction(`anecdote "${content}" has added`))
    event.target.anecdote.value = ''
  }

  if(newAnecdoteMutation.isLoading) {
    return <span>Adding anecdote...</span>
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
