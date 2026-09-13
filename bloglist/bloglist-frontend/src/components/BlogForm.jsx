import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'
import { useBlogsActions } from '../blogStore'
import useNotify from '../hooks/useNotify'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { notify } = useNotify()
  const { create } = useBlogsActions()

  const navigate = useNavigate()
  const handleSubmit = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await create(newBlog)
      notify(
        `a new blog "${returnedBlog.title}" was added`
      )
    } catch (error) {
      notify(
        'creating the blog failed',
        'error'
      )

      throw error
    }
    setTitle('')
    setAuthor('')
    setUrl('')

    navigate('/')
  }

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 500
        }}
      >
        <Typography variant="h5">
          Create new blog
        </Typography>

        <TextField
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextField
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextField
          label="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />

        <Button
          type="submit"
          variant="contained"
        >
          Create
        </Button>
      </Box>

    </div>
  )
}

export default BlogForm
