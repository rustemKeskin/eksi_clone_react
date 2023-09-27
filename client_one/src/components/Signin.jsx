/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { setUser, setNotificationMessage } from '../redux/slices/sharedDataSlice';
import apiService from '../services/eksiApi';
import Description from './Description'


const Signin = () => {

  const dispatch = useDispatch();

  async function handleSubmit(event) {
    
    event.preventDefault();
    let name = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    
    apiService.login({username : name, password})
      .then(response => {

        if (response.statusText == 'OK') {

          delete response.data.password;
          delete response.data.image_url;
          dispatch(setUser(response.data))

          dispatch(setNotificationMessage('you logged in'));
          setTimeout(() => { dispatch(setNotificationMessage(null)) },2000)

          localStorage.setItem('user', JSON.stringify(response.data))
        }
      })
      .catch((err) => {
        setNotificationMessage('Invalid credentials. Please check your username and password.');
        setTimeout(() => { setNotificationMessage(null) }, 2000);
        console.error('handleSubmit Error line 36 :', err)
      })
  }

  return (
    <>
    <form id='signIn' method="post" onSubmit={handleSubmit}>
      <dl>
        <dt>
          <label htmlFor="username">Username :</label>
          <br/>
          <input type="text" id="username" placeholder="John Doe" />
        </dt>
        <dt>
          <label htmlFor="password">Password :</label>
          <br/>
          <input type="password" id="password" placeholder="123abc" />
        </dt>
      <input type="submit" value="Sign In" />
      </dl>
    </form>
    <Description />
    </>
  )
}


export default Signin
