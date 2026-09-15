import { useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import loginService from '../services/login'
import userService from '../services/users'
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

  const logoutMutation = useMutation({
    mutationFn: () => {
      removeUser()
      setUser(null)
    }
  })

  const results =useQuery({
    queryKey:['users'],
    queryFn:userService.getAllUsers,
    retry:2
  })

  return {
    user: user,
    login: async (username, password) => {
      return await loginMutation.mutateAsync(username, password)
    },
    logout: async () => {
      await logoutMutation.mutateAsync()
    },
    users:results.data,
    usersPending:results.isPending,
    userError:results.isError
  }
}

export default useUser