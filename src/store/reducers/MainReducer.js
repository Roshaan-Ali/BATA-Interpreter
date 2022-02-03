import {
    FIREBASE_DATA
  } from '../actions/actionType';
  
  const initialData = {
    firebaseData: null
  };
  

  export function firebaseDataRedux(state=initialData,action){
    switch(action.type){
        case FIREBASE_DATA:
            return action.payload;
        default:
            return state
    }
}