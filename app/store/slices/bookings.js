import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegin } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  list: [],
  isLoading: false,
  error: null,
  offDayLoading: false,
  unBookingLoading: false,
};

const usersSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookingsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    bookingsReceive: (state, action) => {
      state.error = null;
      state.isLoading = false;
    },
    bookingsRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    rideRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.list = [];
    },
    rideReceive: (state, action) => {
      state.error = null;
      state.list = action.payload.data;
      state.isLoading = false;
    },
    rideRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    offTodayRequest: (state) => {
      state.offDayLoading = true;
      state.error = null;
    },
    offTodayReceive: (state, action) => {
      state.error = null;
      state.offDayLoading = false;
    },
    offTodayRequestFail: (state, action) => {
      state.offDayLoading = false;
      state.error = action.payload;
    },
    unBookingRequest: (state) => {
      state.unBookingLoading = true;
      state.error = null;
    },
    unBookingReceive: (state) => {
      state.unBookingLoading = false;
      state.list = [];
      state.error = null;
    },
    unBookingRequestFail: (state, action) => {
      state.unBookingLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  bookingsReceive,
  bookingsRequest,
  bookingsRequestFail,
  rideReceive,
  rideRequest,
  rideRequestFail,
  offTodayReceive,
  offTodayRequest,
  offTodayRequestFail,
  unBookingRequest,
  unBookingReceive,
  unBookingRequestFail,
} = usersSlice.actions;

export default usersSlice.reducer;

export const getRides = () => {
  return apiCallBegin({
    url: '/booking/booked',
    method: 'get',
    onSuccess: rideReceive.type,
    onStart: rideRequest.type,
    onError: rideRequestFail.type,
  });
};
export const rideOffToday = (id, data, pushToken) => {
  return apiCallBegin({
    url: `/booking/${id}/offToday?pushToken=${pushToken}`,
    method: 'post',
    data,
    onSuccess: offTodayReceive.type,
    onStart: offTodayRequest.type,
    onError: offTodayRequestFail.type,
  });
};
export const unBookingRide = (id, pushToken) => {
  return apiCallBegin({
    url: `/booking/${id}/unBooking?pushToken=${pushToken}`,
    method: 'delete',
    onSuccess: offTodayReceive.type,
    onStart: offTodayRequest.type,
    onError: offTodayRequestFail.type,
  });
};
export const bookingNow = (pushToken, data) => {
  return apiCallBegin({
    url: `/booking/now?pushToken=${pushToken}`,
    // url: `/booking/now`,
    method: 'post',
    data,
    onSuccess: bookingsReceive.type,
    onStart: bookingsRequest.type,
    onError: bookingsRequestFail.type,
  });
};

/// selecter
export const appSelectBooking = (state) => state.entities.booking;
