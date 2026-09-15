import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import useUser from '../hooks/useUser'

const Users = () => {
  const { users, usersPending } = useUser()

  if (usersPending) {
    return <div>Loading ...</div>
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
          Users
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>

                <TableCell>
                  <strong>Username</strong>
                </TableCell>

                <TableCell>
                  <strong>Blogs created</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </TableCell>

                  <TableCell>
                    {user.username}
                  </TableCell>

                  <TableCell>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default Users
