import { create } from 'zustand'
const useNotificationStore = create((set) => ({
  message: null,
  type:null,
  setNotification: (message, type) => {
    set({ message,type })
    setTimeout(() => {
      set({ message:null })
    }, 5000)
  },

  clearNotification: () => {
    set({ message: null })
  },
}))

export  const useNotification = ( ) => useNotificationStore(state => state.setNotification)

export default useNotificationStore
