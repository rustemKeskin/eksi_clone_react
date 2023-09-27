/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars   */

import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../redux/slices/sharedDataSlice';

function Pagination() {
  
  const dispatch = useDispatch();
  const entries = useSelector(state => state.sharedData.entries)
  const currentPage = useSelector(state => state.sharedData.currentPage)
  let options = (new Array(Math.ceil(entries.length/7))).fill(true);

  return (
    <select id='pager' value={currentPage} onChange={(e) => dispatch(setCurrentPage(+e.target.value))}>
      {options.map((_,i) => <option key={i+1} value={i+1}>Page {i+1} </option>)}
    </select>
  );
}


export default Pagination;
