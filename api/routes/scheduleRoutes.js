const express = require('express');
const authController = require('../controllers/authController');
const scheduleController = require('../controllers/scheduleController');

const router = express.Router();

router.get(
  '/findAllSchedulesWithDetails',
  // authController.proctect,
  scheduleController.getAllSchedules,
);
router.get(
  '/search',
  authController.proctect,
  scheduleController.searchSchedule,
);
router.get(
  '/recovery',
  // authController.proctect,
  scheduleController.getRecovery,
);
router.get(
  '/address',
  authController.proctect,
  scheduleController.getSchedulesWithByAddress,
);

router.route('/').post(scheduleController.createSchedule);

router
  .route('/:id')
  .get(scheduleController.getSchedule)
  .patch(scheduleController.updateSchedule)
  .delete(scheduleController.deleteSchedule);

module.exports = router;
