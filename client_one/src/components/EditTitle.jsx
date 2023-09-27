/* eslint-disable react/prop-types */
import apiService from "../services/eksiApi";
import { useSelector, useDispatch } from 'react-redux'
import { initializeTitles, setMain } from "../redux/slices/sharedDataSlice";

const EditTitle = () => {

  const dispatch = useDispatch();
  const title = useSelector(state => state.sharedData.title)

  function handleEdit() {

    let input = document.querySelector('#editInput')

    apiService.editTitle(title.title, { newTitle : input.value })
      .then(() => {
        dispatch(setMain(input.value));
        dispatch(initializeTitles());
        input.value = null;
      })
  }

  return (
    <>
      <h3>{title.title}</h3>

      <div>
        <input id="editInput" type="text"/>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </>
  );
}


export default EditTitle;

