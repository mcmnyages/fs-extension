import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useNotify = () => {
  const { notification,notify } = useContext(NotificationContext)
  return{
    message:notification.message,
    messageType:notification.messageType,
    notify
  }
}
export default useNotify