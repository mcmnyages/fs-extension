import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Typography
} from '@mui/material'
import { useUser } from '../userStore'
import { useUserActions } from '../userStore'
import { useNotification } from '../notificationStore'


const Navigation = () => {
  const { getUser,logout } =useUserActions()
  const notify = useNotification()
  useEffect(() => {
    getUser()
  },[getUser])

  const user = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    notify('You have logout out successfully', 'success')
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
                    Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
                    Users
        </Button>

        {user && (
          <Button color="inherit" component={Link} to="/create">
                        Create
          </Button>
        )}

        <Typography sx={{ flexGrow: 1 }} />

        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>
              {user.name} logged in
            </Typography>
            <Button
              color="inherit"
              sx={{
                color: 'error.contrastText',
                backgroundColor: 'error.main',
                '&:hover': {
                  backgroundColor: 'error.dark',
                }
              }}
              onClick={handleLogout}
            >
                            Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
                        Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navigation