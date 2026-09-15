import { useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'
// import { useBlogsActions } from '../blogStore'
import useBlogs from '../hooks/useBlogs'
import useField from '../hooks/useField'

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const { create } = useBlogs()

  const navigate = useNavigate()
  const handleSubmit = async event => {
    event.preventDefault()

    const newBlog = {
      title:title.value,
      author:author.value,
      url:url.value,
    }

    await create(newBlog)

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
          {...title}
        />

        <TextField
          label="Author"
          {...author}
        />

        <TextField
          label="URL"
          {...url}
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
