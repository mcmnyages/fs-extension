import { create } from 'zustand'
import loginService from './services/login'
import blogService from './services/blogs'


const useUserStore = create(set => ({
  user: null,
  token: null,
  actions: {
    login: async (data) => {
      const loggedUser = await loginService.login(data)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)

      set({
        user:loggedUser,
        token:loggedUser.token
      })
      return loggedUser
    },
    getUser: async () => {
      const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(loggedUserJSON.token)

      set({
        user:loggedUserJSON,
        token:loggedUserJSON.token
      })
      return loggedUserJSON

    },
    logout: async () => {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      set({
        user:null,
        token:null
      })
    }
  }
})
)

export const useUser = () => useUserStore(state => state.user)
export const useToken = () => useUserStore( state => state.token)
export const useUserActions = () => useUserStore(state => state.actions)

export default useUserStore