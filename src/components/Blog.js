import { Link, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { authPropType } from '../prop-types'

export default function Blog ({ auth }) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('https://notes-api.glitch.me/api/notes', {
      auth: auth
    })
      .then(response => {
        setPosts(response.data.notes)
      })
  }, [auth])

  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <div className='Blog'>
      <h1>Blog</h1>
      {posts.map(post => (
        <div key={post._id} className='Post'>
          <h2>
            <Link to={'/post/' + post._id}>
              {post.title || 'No Title'}
            </Link>
          </h2>
          <p>{post.text}</p>
          {post.tags && (
            <p>Tags: {post.tags.join(', ')}</p>
          )}
          <p>Written by {post.user} on {post.updated}</p>
        </div>
      ))}
    </div>
  )
}

Blog.propTypes = {
  auth: authPropType
}
