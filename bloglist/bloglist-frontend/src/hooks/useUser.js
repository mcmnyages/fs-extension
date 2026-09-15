import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import loginService from '../services/login'
import UserContext from '../UserContext'
const useUser = () => {
  const { user, setUser } = useContext(UserContext)

  const loginMutation = useMutation({
    mutationFn:loginService.login,
    onSuccess:(user) => {
      setUser(user)
      console.log('user here',user)
    }
  })

  return{
    user:user,
    login: async (username,password) => {
      return await loginMutation.mutateAsync(username, password)
    }
  }
}

export default useUser