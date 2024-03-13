import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../api';

const initialState = {
  notifyList: [],
  notifyLoading: false,
};

const usersSlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    notifyRequest: (state) => {
      state.notifyLoading = true;
      state.error = null;
    },
    notifyReceive: (state, action) => {
      state.error = null;
      state.notifyList = action.payload.data;
      state.notifyLoading = false;
    },
    notifyRequestFail: (state, action) => {
      state.notifyLoading = false;
      state.error = action.payload;
    },
  },
});

export const { notifyReceive, notifyRequest, notifyRequestFail } =
  usersSlice.actions;

export default usersSlice.reducer;

export const getNotify = () => {
  return apiCallBegin({
    url: '/users/notify',
    method: 'get',
    onSuccess: notifyReceive.type,
    onStart: notifyRequest.type,
    onError: notifyRequestFail.type,
  });
};

/// selecter
export const appSelectNotify = (state) => state.entities.notify;
