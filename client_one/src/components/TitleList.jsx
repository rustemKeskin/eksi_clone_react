/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import apiService from "../services/eksiApi";
import { useDispatch, useSelector } from 'react-redux';
import { setMain } from "../redux/slices/sharedDataSlice";
import { useEffect } from "react";
import mobileScripts from "../utils/mobileScripts";

const TitleList = () => {

  const dispatch = useDispatch()
  const titles = useSelector(state => state.sharedData.titleList)

  function handleClick(event, title) {

    event.preventDefault();
    dispatch(setMain(title, 1))
  }

  useEffect(() => {
    
    function handleClickForMobile(el) {

      mobileScripts.toggleContent(el);
      mobileScripts.toggleColor(el);
    }
    if (window.innerWidth < 430){      
      document.querySelectorAll('.sideTitles').forEach(el => {
        el.addEventListener('click', () => handleClickForMobile(el))
      })
    }
  })

  return (
    <aside>
      {titles.map((title, index) => {
        return (
          <a key={index} onClick={(event) => handleClick(event, title)} className="sideTitles">
            <p className="title">{title}</p>
          </a>)
      })}
    </aside>
  )
}


export default TitleList


