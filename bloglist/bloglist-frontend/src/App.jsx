import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import Navigation from './components/Navigation'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import { useNotification } from './notificationStore'


const App = () => {
  const [user, setUser] = useState(null)
  const notify = useNotification()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    )

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])


  const login = async (username, password) => {
    try {
      const loggedUser = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      )

      blogService.setToken(loggedUser.token)
      setUser(loggedUser)

      notify('login successful', 'succes')

      return true
    } catch (error) {
      console.log(error)
      notify(
        'wrong username or password',
        'error'
      )

      return false
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }


  return (
    <div>
      <h1>blog app</h1>
      <ErrorBoundary>
        <Navigation
          user={user}
          logout={logout}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <Notification

        />
      </ErrorBoundary>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <BlogList
              />
            </ErrorBoundary>
          }
        />

        <Route
          path="/login"
          element={
            user
              ?
              <ErrorBoundary>
                <Navigate replace to="/" />
              </ErrorBoundary>
              :
              <ErrorBoundary>
                <LoginForm
                  login={login}
                />
              </ErrorBoundary>
          }
        />

        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog
                user={user}
              />
            </ErrorBoundary>
          }
        />

        <Route
          path="/create"
          element={
            user
              ?
              <ErrorBoundary>
                <BlogForm
                />
              </ErrorBoundary>
              :
              <ErrorBoundary>
                <Navigate
                  replace
                  to="/login"
                />
              </ErrorBoundary>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
