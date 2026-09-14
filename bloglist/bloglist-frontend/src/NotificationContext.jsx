import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
  case 'SET_NOTIFICATION':
    return {
      message: payload.message,
      messageType: payload.messageType
    }
  case 'CLEAR_NOTIFICATION':
    return {
      message: null,
      messageType: null
    }
  default:
    return state
  }


}

export default NotificationContext


export const NotificationContextProvider = (props) => {
  const [ notification, notificationDispatch]=useReducer(notificationReducer,{
    message:null,
    messageType:null
  })
  const notify = (message, messageType) => {
    notificationDispatch({
      type : 'SET_NOTIFICATION',
      payload:{
        message,
        messageType
      }
    })
    setTimeout(() => {
      notificationDispatch({
        type:'CLEAR_NOTIFICATION'
      })
    }, 5000)
  }
  return (
    <NotificationContext.Provider value={{ notification, notify }} >
      {props.children}
    </NotificationContext.Provider>
  )
}