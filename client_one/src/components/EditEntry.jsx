/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import TextArea from "./TextArea";

const EditEntry = () => {

  const title = useSelector(state => state.sharedData.title);
  const entry = useSelector(state => state.sharedData.entry);

  console.log('entry : ', entry);
  
  return (
    <>
      <h3>{title.title}</h3>

      <div className="entry" id="entry" data-entry-id={entry.id} key={entry.id}>
        <p>{entry.entry}</p>
        <p className='entryInfo'>{entry.user_name}</p>
        <img src={`${entry.image_url}`} alt="" />
      </div>

      <TextArea />
    </>
  );
}


export default EditEntry;

