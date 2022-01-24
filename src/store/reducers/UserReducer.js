import {
  USER_LOGIN,
  USER_LOGOUT,
  GET_DATA,
  UPDATE_USER_DATA,
  USER_SIGNUP,
  GET_LANGUAGES,
  ERROR_MODAL,
  GET_REVIEWS_RATINGS_COUNT,
  GET_ALL_REVIEWS,
  GET_CURRENT_BOOKING,
  LOGIN_FAILED,
  BOOKING_HISTORY,
  UPDATE_PHOTO,
  GET_CURRENT_LOC,
} from '../actions/actionType';

const initialData = {
  isUserLogin: false,
  loginFailed: {
    status: false,
    msg: '',
  },
  userData: null,
  accessToken: '',
  coords: {
    lat: 48.8584,
    lng: 2.2945
  },
  errorModal: {
    status: false,
    msg: '',
  },
  languages: [],
  reviews: [],
  currentBooking: null,
  bookingHistory: [],
  totalRatings: 0,
  totalReviews: 0,
};

export function UserReducer(state = initialData, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loginFailed: {
          status: false,
          msg: '',
        },
        ...action.payload,
      };

    case GET_CURRENT_LOC:
      return {
        ...state,
        coords: action.payload,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: {
          status: true,
          msg: action.payload,
        },
      };

    case USER_LOGOUT:
      return {
        ...initialData,
      };

    case GET_CURRENT_BOOKING:
      return {
        ...state,
        currentBooking: action.payload,
      };

    case BOOKING_HISTORY:
      return {
        ...state,
        bookingHistory: action.payload,
      };

    case GET_LANGUAGES:
      return {
        ...state,
        ...action.payload,
      };

    case GET_ALL_REVIEWS:
      return {
        ...state,
        ...action.payload,
      };

    case GET_REVIEWS_RATINGS_COUNT:
      console.log(action.payload);
      return {
        ...state,
        totalRatings: action.payload.rate,
        totalReviews: action.payload.comment,
      };

    case ERROR_MODAL:
      return {
        ...state,
        errorModal: action.payload,
      };

    case GET_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER_DATA:
      console.log(
        'UPDATE_USER_DATA..... ',
        JSON.stringify(action.payload, null, 2),
      );

      return {
        ...state,
        loginFailed: {
          status: false,
          msg: '',
        },
        userData: {
          ...action.payload,
        },
      };

    case UPDATE_PHOTO:
      console.log(
        'UPDATE_PHOTO:::::: ',
        JSON.stringify(action.payload, null, 2),
      );
      return {
        ...state,
        loginFailed: {
          status: false,
          msg: '',
        },
        userData: {
          ...state.userData,
          profile_image: action.payload,
        },
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
