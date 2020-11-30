import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import { authPropType } from '../prop-types'

export default function Post ({ auth }) {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios.get('https://notes-api.glitch.me/api/notes', {
      auth: auth
    })
      .then(res => {
        const posts = res.data.notes
        setPost(posts.find(post => post._id === id))
      })
  }, [id])

  function deletePost () {
    axios.delete('https://notes-api.glitch.me/api/notes/' + id, {
      auth: auth
    })
      .then(res => {
        setDeleted(true)
      })
  }

  if (!auth) {
    return <Redirect to='/login' />
  }

  if (deleted) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1>{post.title || 'No Title'}</h1>
      <p>
        {post.text}
      </p>
      <div>
        <button onClick={deletePost}>Delete this post</button>
      </div>
    </div>
  )
}

Post.propTypes = {
  auth: authPropType
}
