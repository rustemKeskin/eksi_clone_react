/* eslint-disable react/prop-types */
import apiService from '../services/eksiApi';

const Signup = ({setNotificationMessage, setUser, setSignup}) => {

  function handleSubmit(event) {

    event.preventDefault();
    let email = document.querySelector('#email').value;
    let username = document.querySelector('#username').value;
    let pass1 = document.querySelector('#password1').value;
    let pass2 = document.querySelector('#password2').value;

    if (pass1 != pass2) {
      setNotificationMessage('passwords do not match');
      setTimeout(() => { setNotificationMessage(null) }, 2000);
    }
    
    apiService.signUp({username, email, password : pass1})
      .then(response => {

        setNotificationMessage(response.data.message);
        setTimeout(() => {setNotificationMessage(null)},2000);

        apiService.login({username, password : pass1})
          .then(res => {
            
            if (res.statusText == 'OK') {
              delete res.data[0].password;
              delete res.data[0].image_url;
              setUser(res.data[0]);
              setSignup(false);
              localStorage.setItem('user', JSON.stringify(res.data[0]))
            }
          })

      })
      .catch((err) => {
        setNotificationMessage('Invalid credentials. Please check your username and password.');
        setTimeout(() => {setNotificationMessage(null)}, 2000);
        console.error('Error:', err)
      })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <dl>
          <dt>
            <label htmlFor="email">Email:</label>
          </dt>
          <dd>
            <input id="email" type="email" name="email" required placeholder="email" />
          </dd>
          <dt>
            <label htmlFor="username">Username:</label>
          </dt>
          <dd>
            <input id="username" type="text" name="username" placeholder="username" />
          </dd>
          <dt>
            <label htmlFor="password1">Password:</label>
          </dt>
          <dd>
            <input id="password1" type="password" name="password1" placeholder="password" />
          </dd>
          <dt>
            <label htmlFor="password2">Password Again:</label>
          </dt>
          <dd>
            <input id="password2" type="password" name="password2" placeholder="password" />
          </dd>
        </dl>
        <input type="submit" value="Sign UP"/>
      </form>
    </div>
  )
}


export default Signup;