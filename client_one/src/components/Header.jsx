/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import apiService from "../services/eksiApi"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  setSignUp,
  setUser,
  setSettings,
  setProfile,
  setTitle,
  setMain,
  setEntries
} from "../redux/slices/sharedDataSlice";
import mobileScripts from "../utils/mobileScripts";

const Header = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.sharedData.user)
  const signup = useSelector(state => state.sharedData.signUp)
  const titleList = useSelector(state => state.sharedData.titleList)

  function handleSubmit(event) {

    event.preventDefault();
    const searchedTitle = document.querySelector('#search').value;
    document.querySelector('#search').value = null;

    if (titleList.includes(searchedTitle)) {

      dispatch(setMain(searchedTitle))

    } else {

      dispatch(setTitle({title : searchedTitle}));
      dispatch(setEntries([]));
      dispatch(setProfile(false));
      dispatch(setSettings(false));
    }
  }

  function handleProfile(event) {

    event.preventDefault();
    dispatch(setProfile(true));
    dispatch(setSettings(false));
    dispatch(setSignUp(false));
  }
  
  function handleSettings(event) {
    
    event.preventDefault();
    dispatch(setSettings(true));
    dispatch(setProfile(false));
    dispatch(setSignUp(false));
  }

  function handleSignUp(event) {
    event.preventDefault();
    dispatch(setSignUp(true));
    dispatch(setSettings(false));
    dispatch(setProfile(false));
  }

  function handleSignIn(event) {

    event.preventDefault();
    console.log('here');
    dispatch(setSignUp(false));
  }

  function handleSignout(event) {

    event.preventDefault();
    apiService.signOut();
    dispatch(setUser(null));
    localStorage.removeItem('user');
  }

  function links(user) {

    if (user) {
      return (
        <div className="links">
          <div>
            <a onClick={handleProfile} id="myProfile">My Profile</a>
          </div>
          <div>
            <a onClick={handleSettings} id="Settings">Settings</a>
          </div>
          <div>
            <a onClick={handleSignout} id="SignOut">Sign Out</a>
          </div>
        </div>
      )
    } else if (signup) {
      return (
        <div className="links">
          <div>
            <a onClick={handleSignIn} id="signIn">Sign In</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="links">
          <div>
            <a onClick={handleSignUp} id="signUp">Sign Up</a>
          </div>
        </div>
      )
    }
  }
  // mobile screen size script
  useEffect(() => {

    function handleClick(el) {

      mobileScripts.toggleColor(el)
      mobileScripts.toggleContent(el)
    }

    if (window.innerWidth < 431) {

      let arr = [
        document.querySelector('#baslik'), 
        document.querySelector('#icerik'),
        ...document.querySelectorAll('.links > div')
      ]

      arr.forEach(el => el.addEventListener('click', () => handleClick(el)));
    }

  }, [user]);

  return (
      <div id="myHeader">

        <div id="eksiLogo">
          <img src="./images/logo.jpg" alt="" />
        </div>

        <div id="searchDouble">
          <form>
            <input type="text" placeholder="Search title.." name="searchTxt" id="search" />
            <button id="srchBtn" onClick={handleSubmit}>Search</button>
          </form>
        </div>

        { links(user) }

        <div className="using">
          <p>using React, Mongo, Typecript/JavaScript</p>
        </div>

        <nav id="sub-navigation">
          <ul id="quick-index-nav">
            <li id="baslik">titles</li>
            <li id="icerik">content</li>
          </ul>
        </nav>
      </div>
  )
}


export default Header


