import { useParams } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from '@mui/material'
import useUser from '../hooks/useUser'

const User = () => {
  const { users, usersPending } = useUser()
  const { id } = useParams()

  if (usersPending) {
    return <div>Loading ...</div>
  }

  const user = users.find(user => user.id === id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <Card
      sx={{
        maxWidth: 700,
        mb: 3,
        mt: 3,
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          {user.username}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" gutterBottom>
                    Added blogs
        </Typography>

        <Box>
          {user.blogs.map(blog => (
            <Typography
              key={blog.id}
              sx={{ py: 1 }}
            >
              <li>
                {blog.title}
              </li>
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default User
