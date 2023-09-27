import axios from 'axios'

const first_project = axios.create({
  baseURL: 'http://localhost:3000/first_project/api', 
});

const getTitles = () => {
  return first_project.get('/titles')
}

const deleteTitle = (title) => {
  return first_project.delete(`/titles/${title}`)
}

const login = (credentials) => {
  return first_project.post(`/users/login`, credentials)
}

const getTitleByName = (title) => {
  return first_project.get(`/titles/${title}/name`)
}

const getTitleById = (id) => {
  return first_project.get(`/titles/${id}/id`)
}

const getEntries = (title) => {
  return first_project.get(`/titles/title_name/${title}/entries`)
}

const getEntry = (id) => {
  return first_project.get(`/entries/${id}`)
}

const createEntry = (entry) => {
  return first_project.post('/entries', entry);
}

const signOut = () => {
  return first_project.post('/users/logout');
}

const deleteEntry = (entryId) => {
  return first_project.delete(`/entries/${entryId}`)
}

const editEntry = (entryId, entry) => {
  return first_project.patch(`/entries/${entryId}`, entry)
}

const editTitle = (title_name, newTitle) => {
  return first_project.patch(`/titles/${title_name}`, newTitle) // {newTitle : 'xxxx'}
}

const userEntries = (username) => {
  return first_project.get(`/users/entries/${username}`)
}

const createTitle = (newTitle, userId) => {
  return first_project.post('/titles', {newTitle, userId})
}

const signUp = (credentials) => {
  return first_project.post('/users', credentials)
}



export default {
  login,
  signUp,
  signOut,
  getEntry,
  getTitleByName,
  getTitleById,
  editTitle,
  userEntries,
  getTitles,
  editEntry,
  getEntries,
  deleteTitle,
  createEntry,
  deleteEntry,
  createTitle
}
