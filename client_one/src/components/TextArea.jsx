/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import apiService from "../services/eksiApi"
import { editContent, newContent, newTitle } from "../redux/slices/sharedDataSlice"
import { useDispatch, useSelector } from 'react-redux'

const TextArea = () => {
  
  const user = useSelector(state => state.sharedData.user)
  const title = useSelector(state => state.sharedData.title)
  const entry = useSelector(state => state.sharedData.entry)
  const entries = useSelector(state => state.sharedData.entries)
  const currentPage = useSelector(state => state.sharedData.currentPage)
  const dispatch = useDispatch();

  function handleSubmit(event) {

    event.preventDefault();
    const content = document.querySelector('textarea').value;
    document.querySelector('textarea').value = null;

    if (entry) {  // edit Entry
      dispatch(editContent(entry,title,content));
    } else if (entries.length == 0) { // new Title
      dispatch(newTitle(title.title, user, content));
    } else {  // new Entry
      const newEntry = {titleId : title.id, userId : user.id, new_entry : content}
      dispatch(newContent(newEntry, title.title, currentPage))
    }
  }

  return (
    <>
      <form id="formEntry" onSubmit={handleSubmit} >
        <textarea style={{width: '80%'}} ></textarea>
        <button>Send</button>
      </form>
    </>
  )
}


export default TextArea;
