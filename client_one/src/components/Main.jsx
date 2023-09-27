/* eslint-disable react/prop-types */
import Signin from './Signin'
import Pagination from './Pagination';
import Entries from './Entries';
import TextArea from './TextArea';
import Notification from './Notification';
import Settings from './Settings';
import Profile from './Profile'
import Signup from './Signup';
import { useSelector } from 'react-redux'
import TitleButtons from './TitleButtons'
import EditTitle from './EditTitle';
import EditEntry from './EditEntry';

const Main = () => {
  
  const user = useSelector(state => state.sharedData.user)
  const settings = useSelector(state => state.sharedData.settings)
  const titleEdit = useSelector(state => state.sharedData.titleEdit)
  const entry = useSelector(state => state.sharedData.entry)
  const signup = useSelector(state => state.sharedData.signUp)
  const profile = useSelector(state => state.sharedData.profile)
  const title = useSelector(state => state.sharedData.title)
  const entries = useSelector(state => state.sharedData.entries )


  function MainComponent() {
    
    if (entry && user) {
      return  <EditEntry />
    } else if (profile && user) {
      return <Profile user={user}/>
    } else if (titleEdit && user) {
      return  <EditTitle />
    } else if (settings && user) {
      return <Settings />
    } else if (title.title && user) {
      return (
        <>
          <h3>{title.title}</h3>
          {title.user_id == user.id ? <TitleButtons /> : null}
          <Pagination />
          <Entries  entries={entries}/>
          <TextArea />
        </>
      )
    } else if (user) {
      return <h3> HOME PAGE</h3>
    } else if (signup) {
      return <Signup />
    } else {
      return <Signin />
    }
  }

  return (
    <main id="main">
      <Notification />
      { MainComponent() }
    </main>
  )
}

export default Main

