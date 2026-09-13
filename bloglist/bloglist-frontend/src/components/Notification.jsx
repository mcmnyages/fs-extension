// import useNotificationStore from '../notificationStore' // I used zustund here
import useNotify from '../hooks/useNotify'

const Notification = () => {
  const { message,type } = useNotify()
  if (!message) {
    return null
  }

  const style = {
    color:
      type === 'error'
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
