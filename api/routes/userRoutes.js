const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
// const courseRoute = require('./courseRoutes');

const router = express.Router();

router.post(
  '/signup',
  authController.checkRoleIfIsAdmin,
  authController.checkPasswordConfirm,
  authController.checkIsEmailValid,
  authController.signup,
);

router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post(
  '/forgotpassword',
  authController.checkIsIfEmailExist,
  authController.forgetPassword,
);
router.patch(
  '/resetPassword/:token',
  authController.checkPasswordConfirm,
  authController.resetPassword,
);

router.patch(
  '/updateMyPassword',
  authController.proctect,
  authController.checkPasswordConfirm,
  authController.updatepassword,
);
router.get(
  '/notify',
  authController.proctect,
  userController.getUserNotification,
);

router.post('/upload');

// Protect all routes after this middleware
// router.use(authController.proctect);

// router.patch('/updateMe', userController.updateMe);

// router.delete('/deleteMe', userController.deleteMe);

//GET : /:userID/courses
router.use(
  '/:id/courses',
  authController.restrictTo('admin', 'instructor'),
  //   courseRoute,
);

// //POST : /:userID/courses
// router.use(
//   '/:id/courses',
//   authController.restrictTo('admin', 'instructor'),
//   courseRoute,
// );

// // Only access with Admin after this middleware
// router.use(authController.restrictTo('admin'));

// .post(userController.createUser);

router.get('/getUserInfo', authController.proctect, userController.getUserInfo);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
//   .get(userController.getUser)

module.exports = router;
