import * as AdminActionTypes from '../actiontypes/admin';


//==============================================================
//state={} is overwritten by initialState provided in index.js
export default function Admin(state={}, action){
  switch (action.type) {

    case AdminActionTypes.UPDATE_STATE: {
      console.log("action.newState", action.newState);
      return {...state, ...action.newState};
    }

    default:
      return state;
  }
}
