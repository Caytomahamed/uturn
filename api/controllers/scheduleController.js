const handleFactory = require('./handleFactory');
const scheduleModel = require('../models/scheduleModel');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getRecovery = catchAsync(async (req, res, next) => {
  const schedules = await scheduleModel.findRecovery();

  if (!schedules.length) {
    return next(new appError('OH! no recovery car is avaible'));
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

exports.getToDaySchedule = catchAsync(async (req, res, next) => {
  const schedules = await scheduleModel.todaySchedules();

  if (!schedules) {
    return next(
      new appError('OH! no schedule to day.Please check to tomorrow'),
    );
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

exports.getTomorrowSchedule = catchAsync(async (req, res, next) => {
  const schedules = await scheduleModel.tomorrowSchedules();

  if (!schedules) {
    return next(new appError('OH! no schedule to day.Please check this week'));
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

exports.getThisWeek = catchAsync(async (req, res, next) => {
  const schedules = await scheduleModel.weekSchedules();

  if (!schedules) {
    return next(
      new appError('OH! no schedule to day.Please check to Next week'),
    );
  }

  res.status(200).json({
    status: 'success',
    data: schedules,
  });
});

// Find all schedules with user details
exports.findAllSchedulesWithDetailsController = catchAsync(
  async (req, res, next) => {
    const schedules = await scheduleModel.findAllSchedulesWithDetails();
    if (!schedules) {
      return next(
        new appError('OH! no schedule to found .Please check to Next week'),
      );
    }
    res.status(200).json({
      status: 'success',
      data: schedules,
    });
  },
);
// Find all schedules with user details
exports.getSchedulesWithByAddress = catchAsync(async (req, res, next) => {
  // const
  const address = { start: req.user.address };
  console.log(address);
  const schedules = await scheduleModel.searching(address);

  if (!schedules) {
    return next(
      new appError('OH! no schedule to found.Please check your location'),
    );
  }

  const doc = schedules.slice(0, 4);
  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.getAllSchedules = handleFactory.getAll(scheduleModel);
exports.getSchedule = handleFactory.getOne(scheduleModel);
exports.createSchedule = handleFactory.createOne(scheduleModel);
exports.updateSchedule = handleFactory.updateOne(scheduleModel);
exports.deleteSchedule = handleFactory.deleteOne(scheduleModel);
exports.searchSchedule = handleFactory.searching(scheduleModel);
