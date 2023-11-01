import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'


ReactDOM.createRoot(document.querySelector('body')).render(
  
  <Provider store={store}>
    <App />
  </Provider>
)
