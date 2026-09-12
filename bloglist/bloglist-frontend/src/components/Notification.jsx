import useNotificationStore from '../notificationStore'

const Notification = () => {
  const { message, type } = useNotificationStore()
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
