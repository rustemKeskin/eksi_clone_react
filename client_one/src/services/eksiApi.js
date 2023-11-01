import axios from 'axios'

const eksi = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

function getTitles() {
  return eksi.get('/titles');
}

const deleteTitle = (title) => {
  return eksi.delete(`/titles/${title}`)
}

const login = (credentials) => {
  return eksi.post(`/users/login`, credentials)
}

const getTitleByName = (title) => {
  return eksi.get(`/titles/${title}/name`)
}

const getTitleById = (id) => {
  return eksi.get(`/titles/${id}/id`)
}

const getEntries = (title) => {
  return eksi.get(`/titles/title_name/${title}/entries`)
}

const getEntry = (id) => {
  return eksi.get(`/entries/${id}`)
}

const createEntry = (entry) => {
  return eksi.post('/entries', entry);
}

const signOut = () => {
  return eksi.post('/users/logout');
}

const deleteEntry = (entryId) => {
  return eksi.delete(`/entries/${entryId}`)
}

const editEntry = (entryId, entry) => {
  return eksi.patch(`/entries/${entryId}`, entry)
}

const editTitle = (title_name, newTitle) => {
  return eksi.patch(`/titles/${title_name}`, newTitle)
}

const userEntries = (username) => {
  return eksi.get(`/users/entries/${username}`)
}

const createTitle = (newTitle, userId) => {
  return eksi.post('/titles', {newTitle, userId})
}

const signUp = (credentials) => {
  return eksi.post('/users', credentials)
}

eksi.interceptors.request.use(

  (request) => {

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');

    // If a token is available, add it to the request headers
    if (token) { request.headers.Authorization = `Bearer ${token}`;  }

    return request;
  },
  (error) => {  return Promise.reject(error);  }
);

// eksi.interceptors.response.use(

//   (response) => {

//     console.log('incoming response : ', response);
    
//     // if (response.data.message == "Logged out successfully") {
//     //   localStorage.removeItem('jwtToken');
//     // }
    
//     // return response;
//   },
//   (error) => {

//     console.log('myError : ', error);
//     // Handle errors, such as unauthorized access (401) or token expiration
//     // if (error.response.status === 401) {

//     //   console.log('error.response.status === 401');

//     //   // Redirect the user to the login page or trigger a logout action
//     //   // based on your application's logic
//     // }
    
//     // Handle other error cases as needed
//     // return Promise.reject(error);
//   }
// );

export default {
  login,
  signUp,
  signOut,
  getEntry,
  editTitle,
  getTitles,
  editEntry,
  getEntries,
  deleteTitle,
  createEntry,
  deleteEntry,
  createTitle,
  userEntries,
  getTitleById,
  getTitleByName,
}
