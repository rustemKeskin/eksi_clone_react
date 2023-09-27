/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import apiService from '../services/eksiApi';
import Entries from './Entries';

const Profile = ({user}) => {

  const [obj, setObj] = useState({});

  useEffect(() => {
    apiService.userEntries(user.user_name)
      .then((res) => {

        const newObj = {};

        res.data.forEach((el) => { 
          newObj[el.title] ? newObj[el.title].push(el) : newObj[el.title] = [el] 
        });

        setObj(newObj);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]);

  return (
    <>
      {<div>
          {Object.keys(obj).length === 0 ? (<p>There is no entry to display</p>) : 

          (Object.keys(obj).map((key) => (
              <>
                <h3 key={key}>{key}</h3> 
                <Entries entries={obj[key]} />
              </>
          )))}
       </div>}
    </>
  );
};

export default Profile;
