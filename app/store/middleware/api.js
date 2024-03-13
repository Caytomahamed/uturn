import axios from 'axios';
import * as actions from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN_KEY = 'authToken';
const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegin.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } =
      action.payload || {};
    if (onStart) dispatch({ type: onStart });

    next(action);

    const token = await AsyncStorage.getItem(TOKEN_KEY);

    try {
      const response = await axios.request({
        baseURL: 'http://10.0.2.2:9000/api/v1',
        url,
        method,
        data,
        headers: {
          // Add your token to the headers
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('token', response.data.token);
      // General Success
      dispatch(actions.apiCallSuccess(response.data));

      // Specific Success
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General Fail
      dispatch(actions.apiCallFail(error.message));

      console.log(error);

      // Specific Fail
      if (onError)
        dispatch({ type: onError, payload: error.response.data.message });
    }
  };

export default apiMiddleware;
