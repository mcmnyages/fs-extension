import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import { useUser } from './userStore'


const App = () => {
  const user =useUser()

  return (
    <div>
      <h1>blog app</h1>
      <ErrorBoundary>
        <Navigation
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
