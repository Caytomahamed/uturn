import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

const initialState = {
  list: null,
  isLoading: false,
  error: null,
  searchList: [],
};

const usersSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    schedulesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    schedulesReceive: (state, action) => {
      state.list = action.payload.data;
      state.error = null;
      state.isLoading = false;
    },
    schedulesRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginReceive: (state, action) => {
      state.token = action.payload.token;
      state.isLoading = false;
      AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
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
    schedulesSearchRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.searchList = [];
    },
    schedulesSearchReceive: (state, action) => {
      state.searchList = action.payload.data;
      state.error = null;
      state.isLoading = false;
    },
    schedulesSearchRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.searchList = [];
    },
  },
});

export const {
  schedulesReceive,
  schedulesRequest,
  schedulesRequestFail,
  loginReceive,
  loginRequest,
  loginRequestFail,
  authCheckComplete,
  authCheckStart,
  schedulesSearchReceive,
  schedulesSearchRequest,
  schedulesSearchRequestFail,
} = usersSlice.actions;

export default usersSlice.reducer;

export const getScheduleByAddress = () => {
  return apiCallBegin({
    url: '/schedules/address',
    method: 'get',
    onSuccess: schedulesReceive.type,
    onStart: schedulesRequest.type,
    onError: schedulesRequestFail.type,
  });
};
export const searchSchedule = (query) => {
  return apiCallBegin({
    url: `/schedules/search?start=${query}`,
    method: 'get',
    onSuccess: schedulesSearchReceive.type,
    onStart: schedulesSearchRequest.type,
    onError: schedulesSearchRequestFail.type,
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

/// selecter
export const appSelectSchedules = (state) => state.entities.schedules;
