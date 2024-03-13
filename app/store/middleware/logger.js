const logger = (state) => (next) => (action) => {
  // console.log('State', state.getState());
  // console.log('action', action);
  next(action);
};

export default logger;
