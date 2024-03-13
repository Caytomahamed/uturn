import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const USER_TYPE = 'userType';

const initialState = {
  token: null,
  isLoading: false,
  error: null,
  userType: null,
  currentUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerReceive: (state, action) => {
      state.token = action.payload.token;
      state.error = null;
      state.isLoading = false;
      AsyncStorage.setItem(TOKEN_KEY, action.payload.token);
    },
    registerRequestFail: (state, action) => {
      console.log('failed');
      state.token = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginReceive: (state, action) => {
      state.token = action.payload.token;
      state.userType = action.payload.data.roleId;
      state.isLoading = false;
      AsyncStorage.setItem(TOKEN_KEY, action.payload.token);
      AsyncStorage.setItem(USER_TYPE, '' + action.payload.data.roleId);
    },
    loginRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    authCheckStart: (state) => {
      state.isLoading = true;
    },
    authCheckComplete: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.userType = null;
      AsyncStorage.removeItem(TOKEN_KEY); // Clear the token from AsyncStorage
      AsyncStorage.removeItem(USER_TYPE);
    },
    currentUserRequest: (state) => {
      // state.isLoading = true;
      state.error = null;
    },
    currentUserReceive: (state, action) => {
      state.error = null;
      state.currentUser = action.payload.data;
      // state.isLoading = false;
    },
    currentUserRequestFail: (state, action) => {
      // state.isLoading = false;
      console.log("errd",action);
      state.error = action.payload;
    },
  },
});

export const {
  registerReceive,
  registerRequest,
  registerRequestFail,
  loginReceive,
  loginRequest,
  loginRequestFail,
  authCheckComplete,
  authCheckStart,
  logout,
  currentUserReceive,
  currentUserRequest,
  currentUserRequestFail,
} = usersSlice.actions;

export default usersSlice.reducer;

export const signUp = (data) => {
  return apiCallBegin({
    url: '/users/signup',
    method: 'post',
    data,
    onSuccess: registerReceive.type,
    onStart: registerRequest.type,
    onError: registerRequestFail.type,
  });
};

export const login = (data) => {
  return apiCallBegin({
    url: '/users/login',
    method: 'post',
    data,
    onSuccess: loginReceive.type,
    onStart: loginRequest.type,
    onError: loginRequestFail.type,
  });
};
export const getCurrentUser = () => {
  return apiCallBegin({
    url: '/users/getUserInfo',
    method: 'get',
    onSuccess: currentUserReceive.type,
    onStart: currentUserRequest.type,
    onError: currentUserRequestFail.type,
  });
};

/// selecter
export const appSelectUsers = (state) => state.entities.users;

// Check for the token in AsyncStorage when the app starts
export const checkAuth = () => {
  return async (dispatch) => {
    dispatch(authCheckStart());
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const id = await AsyncStorage.getItem(USER_TYPE);
    if (token) {
      dispatch(loginReceive({ token, data: { roleId: id } }));
    }
    dispatch(authCheckComplete());
  };
};

// logout
export const userLogout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};
