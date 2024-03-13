const usersModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await usersModel.findByIdandUpdate(id, req.body);

  if (!user) {
    return next(new AppError('update user failed please try again!', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await usersModel.findByIdandDelete(id);

  //   console.log(user);

  //   if (!user) {
  //     return next(new AppError('update user failed please try again!', 404));
  //   }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});
exports.getUserInfo = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  res.status(200).json({
    status: 'sucess',
    data: user,
  });
});

exports.getUserNotification = catchAsync(async (req, res, next) => {
  const user = req.user;

  const notify = await usersModel.findByUserNotify(user.id);

  if (!user) {
    return next(new AppError('You are not logged in.Please login!', 401));
  }

  res.status(200).json({
    status: 'sucess',
    data: notify,
  });
});
