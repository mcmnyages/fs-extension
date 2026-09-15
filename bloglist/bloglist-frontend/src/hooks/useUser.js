import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import UserContext from '../UserContext'
import { saveUser, removeUser } from '../services/persistentUser'
const useUser = () => {
  const { user, setUser } = useContext(UserContext)

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      saveUser(user) // this one goes to the local storage right after loggin in
      setUser(user) // this one goes to the context since getUser from persistent service might return null
    }
  })

  const logoutmUtation = useMutation({
    mutationFn: () => {
      removeUser()
      setUser(null)
    }
  })

  return {
    user: user,
    login: async (username, password) => {
      return await loginMutation.mutateAsync(username, password)
    },
    logout: async () => {
      await logoutmUtation.mutateAsync()
    }
  }
}

export default useUser