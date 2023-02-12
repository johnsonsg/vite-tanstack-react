import { useQuery, useMutation } from '@tanstack/react-query'

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

function App() {
  const postsQuery = useQuery({
    queryKey: ['posts'], // unique identifier for my query
    // queryFn: This is what is going to run and query the data.
    // This takes a Promise
    queryFn: () => wait(1000).then(() => [...POSTS])
  })

  if (postsQuery.isLoading) return <strong>Loading...</strong>
  if (postsQuery.isError) {
    return <pre>{JSON.stringify(postsQuery.error)}</pre>
  }

  return (
    <div>
      {postsQuery.data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App

// Two things you can do in react query, you can do a query and you can do a mutation.
// Meaning Get Data and Change Data.

// Query is getting day from somewhere. ex.) if you want to get a list of posts
// Mutation is changing some type of data. ex.) creating a brand new post
// These are really the only two things you can do with react-query.

// useQuery takes in an Object.
