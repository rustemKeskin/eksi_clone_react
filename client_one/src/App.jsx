import { useEffect } from "react"
import Header from "./components/Header";
import TitleList from "./components/TitleList";
import Main from './components/Main'
import { initializeTitles } from "./redux/slices/sharedDataSlice";
import { useDispatch } from 'react-redux';
import './style.css'

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(initializeTitles()));

  return (
    <>
      <Header />
      <TitleList />
      <Main />
      <div id="dolgu_one"></div>
      <div id="dolgu_two"></div>
      <div id="dolgu_three"></div>
      <div id="dolgu_forth"></div>
      <div id="dolgu_fifth"></div>
    </>
  )
}


export default App
