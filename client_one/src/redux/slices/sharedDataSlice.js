// src/redux/slices/sharedDataSlice.js
import { createSlice } from '@reduxjs/toolkit';
import apiService from '../../services/eksiApi';

const sharedDataSlice = createSlice({
  name: 'sharedData',
  initialState: {
    role : '',
    title : {},
    user : null,
    entries : [],
    titleList : [],
    currentPage : 1,
    entry: null,
    signUp : false,
    profile : false,
    settings : false,
    titleEdit : false,
    notificationMessage : null,
  },
  reducers: {
    setTitleList: (state, action) => {
      state.titleList = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },    
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
    setTitle(state, action) {
      state.entry = null;
      state.profile = false;
      state.settings = false;
      state.entryEdit = false;
      state.titleEdit = false;
      state.title = action.payload;
    },
    setEntries(state,action) {
      state.entries = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSignUp(state, action) {
      state.signUp = action.payload
    },
    setSettings(state, action) {
      state.entry = null;
      state.entryEdit = false;
      state.settings = action.payload
    },
    setProfile(state, action) {
      state.entry = null;
      state.entryEdit = false;
      state.profile = action.payload
    },
    setTitleEdit(state, action) {
      state.titleEdit = action.payload
    },
    setEntry(state, action) {
      state.profile = false;
      state.entry = action.payload
    },
    formatTitle(state) {
      state.title = {};
    },
    setRole(state, action) {
      state.role = action.payload
    }
  },
});

export const {
  setUser,
  setRole,
  setTitle,
  setEntry,
  setSignUp,
  setEntries,
  setProfile,
  setSettings,
  formatTitle,
  currentPage,
  setTitleList,
  setTitleEdit,
  setEntryEdit,
  setAccessToken,
  setCurrentPage,
  setNotificationMessage,
} = sharedDataSlice.actions;

// async action creators
export const initializeTitles = () => {
  return async (dispatch) => {

    apiService.getTitles()
      .then((response) => {
        dispatch(setTitleList(response.data)) 
      })
      .catch((err) => console.error('Error fetching titles:', err));

    const storedUser = localStorage.getItem('user');
    if (storedUser) { setUser(JSON.parse(storedUser)); }
  }
}

export const setMain = (searchedTitle, page = currentPage) => {
  return async (dispatch) => {

    apiService.getTitleByName(searchedTitle)
      .then(res => {
        dispatch(setTitle(res.data[0]))
        apiService.getEntries(searchedTitle)
          .then(res => {
            dispatch(setEntries(res.data.result));
            dispatch(setCurrentPage(page));
          })
      })
  }
}

export const initializeEditEntry = (entryId) => {
  return async (dispatch) => {

    apiService.getEntry(entryId)
      .then((res1) => {

        apiService.getTitleById(res1.data.title_id)
          .then(res2 => {
            dispatch(setTitle(res2.data))
            dispatch(setEntry(res1.data))
          })
      })
  }
}

export const newContent = (newEntry,title, page = 1) => {
  return async (dispatch) => {

    apiService.createEntry(newEntry)
      .then(() => {

        apiService.getEntries(title)
          .then(res => {
            dispatch(setEntries(res.data.result));
            dispatch(setCurrentPage(page));
          })
      })
      .catch(err => console.log(err));
  }
}

export const editContent = (entry, title, content) => {
  return async (dispatch) => {

    apiService.editEntry(entry.id, {newContent : content})
      .then(() => {
        apiService.getEntries(title.title)
          .then(res => {
            dispatch(setEntries(res.data.result));
            dispatch(setEntry(null));
          })
      })
      .catch(err => console.log(err));
  }
}

export const newTitle = (title, user, content) => {
  return async (dispatch) => {

    apiService.createTitle(title, user.id)
      .then(() => {

        apiService.getTitleByName(title)
          .then((res) => {
            dispatch(initializeTitles())
            dispatch(setTitle(res.data[0]))
            apiService.createEntry({titleId : res.data[0].id, userId : user.id, new_entry : content})
              .then(() => {

                apiService.getEntries(title)
                  .then(res => { 
                    dispatch( setEntries(res.data.result));
                    dispatch( setCurrentPage(1));
                  })
              })
          })
      })
      .catch(err => console.log(err));
  }
}


export default sharedDataSlice.reducer;
