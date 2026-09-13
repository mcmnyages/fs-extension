import { create } from 'zustand'
import loginService from './services/login'
import blogService from './services/blogs'

const useUserStore = create((set) => ({
  user: null,
  token: null,
  actions: {
    login: async (data) => {
      const loggedUser = await loginService.login(data)

      window.localStorage.setItem('loggedBlogappUser',JSON.stringify(loggedUser))

      set({
        user: loggedUser,
        token: loggedUser.token
      })
      return loggedUser
    },

    getUser: () => {
      const loggedUserJSON = JSON.parse(
        window.localStorage.getItem('loggedBlogappUser')
      )

      if (!loggedUserJSON) return null

      set({
        user: loggedUserJSON,
        token: loggedUserJSON.token
      })
      return loggedUserJSON
    },

    logout: () => {
      window.localStorage.removeItem('loggedBlogappUser')

      set({
        user: null,
        token: null
      })
    }
  }
}))

useUserStore.subscribe((state) => {
  blogService.setToken(state.token)
})

export const useUser = () => useUserStore((state) => state.user)
export const useToken = () => useUserStore((state) => state.token)
export const useUserActions = () => useUserStore((state) => state.actions)

export default useUserStore