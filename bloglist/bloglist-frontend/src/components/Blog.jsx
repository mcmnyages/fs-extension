import { useState } from 'react'
import {
  useParams,
  useNavigate,
} from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material'
import useNotify from '../hooks/useNotify'
import useBlogs from '../hooks/useBlogs'
import useUser from '../hooks/useUser'

const Blog = () => {
  const { user } = useUser()
  const {
    blogs,
    isPending,
    likeBlog,
    remove,
    comment: addComment,
  } = useBlogs()

  const { notify } = useNotify()
  const { id } = useParams()
  const navigate = useNavigate()

  const [comment, setComment] = useState('')

  if (isPending) {
    return <div>Loading ...</div>
  }

  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    await likeBlog(blog)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!comment.trim()) return

    await addComment(blog.id, comment.trim())
    setComment('')
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete blog "${blog.title}"?`
    )

    if (!confirmed) return

    await remove(blog.id)
    notify(`${blog.title} deleted successfully`, 'success')

    navigate('/')
  }

  const isCreator =
    user &&
    blog.user &&
    blog.user.username === user.username

  return (
    <Card
      sx={{
        maxWidth: 700,
        mb: 3,
        mt: 3,
        mx: 'auto',
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
        >
          {blog.title}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          by {blog.author}
        </Typography>

        <Typography
          component="a"
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          sx={{
            display: 'block',
            mb: 2,
          }}
        >
          {blog.url}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Added by {blog.user.name}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <Typography>
            Likes: {blog.likes}
          </Typography>

          <Button
            variant="contained"
            onClick={handleLike}
          >
            Like
          </Button>

          {isCreator && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
            >
              Remove
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Comments */}
        <Typography
          variant="h5"
          gutterBottom
        >
          Comments
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 1,
            mb: 3,
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="add a comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!comment.trim()}
          >
            Add comment
          </Button>
        </Box>

        {blog.comments?.length > 0 ? (
          <List>
            {blog.comments.map((c, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  mb: 1,
                  px: 2,
                }}
              >
                <ListItem>
                  <ListItemText
                    primary={c}
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        ) : (
          <Typography
            color="text.secondary"
            sx={{ fontStyle: 'italic' }}
          >
            No comments yet. Be the first to comment!
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog
