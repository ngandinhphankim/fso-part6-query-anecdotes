import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './services/anecdote'

const App = () => {
  const { status, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  if (status === 'loading') {
    return <span>Loading...</span>
  }

  if (status == 'error') {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data?.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
