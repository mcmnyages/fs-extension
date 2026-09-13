import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext


export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState(null)
  const[ type, setType]=useState(null)
  const notify=(message,type) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
    },5000)
  }
  return (
    <NotificationContext.Provider value={{ message,notify,type }} >
      {props.children}
    </NotificationContext.Provider>
  )
}