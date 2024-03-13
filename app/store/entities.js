import { combineReducers } from 'redux';
import userReducer from './slices/users';
import schedules from './slices/schedules';
import bookings from './slices/bookings';
import notify from './slices/notify';

export default combineReducers({
  users: userReducer,
  schedules: schedules,
  booking: bookings,
  notify: notify,
});
