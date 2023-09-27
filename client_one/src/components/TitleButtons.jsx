/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import apiService from "../services/eksiApi";
import { useDispatch, useSelector } from 'react-redux'
import { setTitleEdit, formatTitle, initializeTitles } from "../redux/slices/sharedDataSlice";

const TitleButtons = () => {

  const dispatch = useDispatch();
  const title = useSelector(state => state.sharedData.title)

  function handleDeleteTitle(event) {
    event.preventDefault();
    apiService.deleteTitle(title.title)
      .then(() => {
        dispatch(formatTitle())
        dispatch(initializeTitles());
      })
      
  }
  
  function handleEditTitle(event) {  
    event.preventDefault();
    dispatch(setTitleEdit(true)) 
  }

  return (
    <div id="titleBtns">
      <form onSubmit={(ev) => handleDeleteTitle(ev)}>
        <button id="dltTitle">DELETE TITLE</button>
      </form>
      <form onSubmit={(ev) => handleEditTitle(ev)}>
        <button id="edtTitle">EDIT TITLE</button>
      </form>
    </div>
  )
}


export default TitleButtons;
