import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppNav from './navigations/AppNav';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AuthNav from './navigations/AuthNav';

const store = configureStore();
console.log(localStorage.getItem('isLoggedIn'));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {localStorage.getItem('isLoggedIn') ? <AppNav /> : <AuthNav />}
    </Provider>
  </React.StrictMode>
);
