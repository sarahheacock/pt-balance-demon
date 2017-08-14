import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import AdminReducer from './reducers/admin';

import './stylesheets/index.css';

import { initialData, initialUser, initialEdit, initialMessage, errorStatus } from './data/data';
//=============================================================\


const saveState = (state) => {
  try {
    if(state.message !== errorStatus.expError){
      const serializedState = JSON.stringify({user: state.user, edit: state.edit, message: state.message});
      localStorage.setItem('pt', serializedState);
    }
    else { //do not save session if logged out
      const serializedInitial = JSON.stringify({user: initialUser, edit: initialEdit, message: initialMessage});
      localStorage.setItem('pt', serializedInitial);
    }
  }
  catch(err){

  }
};

const storage = (localStorage.pt !== undefined) ? JSON.parse(localStorage.pt) : {user: initialUser, edit: initialEdit, message: initialMessage};
const initial = {
        message: storage.message,
        edit: storage.edit,
        data: initialData,
        user: storage.user,
      };

const store = createStore(
  AdminReducer, initial, applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
