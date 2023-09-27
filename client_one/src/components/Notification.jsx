import  "./notification.css"
import { useSelector } from 'react-redux'


const Notification = () => {
  
  const message = useSelector(state => state.sharedData.notificationMessage)

  if (message === null) {  return null  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}


export default Notification;
