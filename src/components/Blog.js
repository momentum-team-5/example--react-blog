import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Blog ({ auth }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('https://notes-api.glitch.me/api/notes', {
      auth: auth
    })
      .then(response => {
        setPosts(response.data.notes)
      })
  })

  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <div className='Blog'>
      <h1>Blog</h1>
      {posts.map(post => (
        <div key={post._id} className='Post'>
          <h2>{post.title || 'No Title'}</h2>
          <p>{post.text}</p>
          <p>Written by {post.user} on {post.updated}</p>
        </div>
      ))}
    </div>
  )
}
