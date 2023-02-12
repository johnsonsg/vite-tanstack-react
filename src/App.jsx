import { useQuery } from '@tanstack/react-query'

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

// Examples of what we would query:

// Get url: /posts -> ['posts']
// Get Individual post: /posts/1 -> ['posts', post.id]
// Filter post by: posts?authorId=1 -> ['posts', { authorId: 1}]
// Get all comments for specific post: /posts/1/comments -> ['posts', post.id, 'comments']

function App() {
  console.log(POSTS)
  const postsQuery = useQuery({
    /**
     * Note:
     * How does queryKey work: This is important
     * It must be uniqued about the actual query you are making.
     * So, We are querying all the Posts [...POSTS], which is why we called it 'posts'
     */
    queryKey: ['posts'], // Query Key: unique identifier for my query

    // queryFn: This is what is going to run and query the data.
    // Must take in a Promise
    queryFn: obj =>
      wait(1000).then(() => {
        console.log(obj)
        return [...POSTS]
      })
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
// Meaning Get Data and Change/Add/Update Data.

// Query is getting day from somewhere. ex.) if you want to get a list of posts
// Mutation is changing some type of data. ex.) creating a brand new post
// These are really the only two things you can do with react-query.

// useQuery takes in an Object.
