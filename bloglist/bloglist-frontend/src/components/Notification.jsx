// import useNotificationStore from '../notificationStore' // I used zustund here
import useNotify from '../hooks/useNotify'

const Notification = () => {
  const { message,messageType } = useNotify()
  console.log('Message',message,'Type',messageType)
  if (!message) {
    return null
  }

  const style = {
    color:
      messageType === 'error'
        ? 'red'
        : 'green',
    background: '#eeeeee',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
