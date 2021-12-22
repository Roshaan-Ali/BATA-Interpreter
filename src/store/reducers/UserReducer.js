import {
  USER_LOGIN,
  USER_LOGOUT,
  GET_DATA,
  UPDATE_USER_DATA,
  USER_SIGNUP,
} from '../actions/actionType';

const initialData = {
  isUserLogin: false,
  userData: {
    username: 'Christopher Nolan',
  },
  accessToken: '',
};

export function UserReducer(state = initialData, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOGOUT:
      return {
        ...action.payload,
      };
    case GET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case USER_SIGNUP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
