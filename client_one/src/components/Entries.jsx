/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import apiService from "../services/eksiApi"
import { useDispatch, useSelector } from 'react-redux'
import { setMain, initializeEditEntry } from "../redux/slices/sharedDataSlice"

function Entries({entries}) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.sharedData.user)
  const title = useSelector(state => state.sharedData.title)
  const currentPage = useSelector(state => state.sharedData.currentPage) || 1;
  let currentData = entries.length > 7 ? entries.slice(7*(currentPage-1), 7*currentPage) : entries;

  function entryButtons(el) {
    if (el.user_name == user.user_name) {
      return (
        <>
          <form data-entry-id={el.id} onSubmit={handleDeleteEntry}>
            <button id="dltBtn">delete</button>
          </form>

          <form data-entry-id={el.id} onSubmit={handleEditEntry}>
            <button id="edtBtn">edit</button>
          </form>
        </>
      )
    } else { return null }
  }

  function handleDeleteEntry(event) {

    event.preventDefault()

    let entryId = event.currentTarget.dataset.entryId;

    apiService.deleteEntry(entryId)
      .then(() => dispatch(setMain(title.title, currentPage)));
  }

  function handleEditEntry(event) {

    event.preventDefault()
    let entryId = event.currentTarget.dataset.entryId;
    dispatch(initializeEditEntry(entryId))
  }

  return (
    <>
      {currentData.map(el => {
        return (
          <div className="entry" id="entry" data-entry-id={el.id} key={el.id}>
            <p>{el.entry}</p>
            {entryButtons(el)}
            <p className='entryInfo'>{el.user_name}</p>
            <img src={`.${el.image_url}`} alt="" />
          </div>
        )
      })}
    </>
  )
}

export default Entries;
