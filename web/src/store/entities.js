import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import driverSlice from './slices/driverSlice';
import carSlice from './slices/carSlice';
import routeSlice from './slices/routeSlice';
import boookSlice from './slices/boookSlice';
import schedules from './slices/schedules';

export default combineReducers({
  users: userSlice,
  drivers: driverSlice,
  cars: carSlice,
  routes: routeSlice,
  bookings: boookSlice,
  schedules: schedules,
});
