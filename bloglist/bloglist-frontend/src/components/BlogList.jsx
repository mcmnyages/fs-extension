import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material'
import useBlogs from '../hooks/useBlogs'

const BlogList = () => {
  const { blogs, isPending } = useBlogs()

  if (isPending) {
    return <Typography>Loading...</Typography>
  }

  const sortedBlogs = [...blogs].sort(
    (a, b) => b.likes - a.likes
  )

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Blogs
      </Typography>

      {sortedBlogs.map(blog => (
        <Paper
          key={blog.id}
          sx={{
            p: 2,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              component={Link}
              to={`/blogs/${blog.id}`}
              variant="h6"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              {blog.title}
            </Typography>

            <Typography color="text.secondary">
              by {blog.author}
            </Typography>

            <Typography variant="body2">
              {blog.likes} likes
            </Typography>
          </Box>

          <Button
            component={Link}
            to={`/blogs/${blog.id}`}
            variant="outlined"
          >
            View
          </Button>
        </Paper>
      ))}
    </Box>
  )
}

export default BlogList


