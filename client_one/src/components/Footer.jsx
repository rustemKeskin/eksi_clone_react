/* eslint-disable react/prop-types */

import apiService from "../services/eksiApi";

const Footer = () => {

  function handleSubmit(event) {

    event.preventDefault();

    apiService.signOut()
      .then(() => {
        localStorage.removeItem('user')
        setTitle({})
        setEntries([])
        setUser(null)
        window.location.reload();
      });

  }

  function renderButton() {

    if (user) {
      return (
        <form onSubmit={handleSubmit}>
          <button>Sign Out</button>
        </form>
      );
    } else {
      return (
        <>
          <a href="/first_project/api/users/signin">
            <button>Sign In</button>
          </a>
          <a href="/first_project/api/users/singup">
          <button>Sign Up</button>
          </a>
        </>
      )
    }
  }

  return (
    <footer id="myFooter">
      <h3>Footer Section</h3>
      <div id="right">
        <a href="http://facebook.com">facebook</a>
        <a href="http://twitter.com">twitter</a>
        <a href="http://instagram.com">instagram</a>
      </div>
      { renderButton() }
    </footer>
  )
}


export default Footer

