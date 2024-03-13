import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import actionIcon from '../assets/icons/actions.svg';
import personImg from '../assets/images/person.jpg';

import ActionsModal from '../components/ActionsModal';
import OverlayModal from '../components/OverlayModal';
import { useOutsideClick } from '../hooks/useOutsideClick';
import CustomInput from '../components/CustomInput';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../store/slices/userSlice';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import {
  getDrivers,
  selectFilteredAndSortedDrivers,
  updateDriver,
} from '../store/slices/driverSlice';
import ToggleSwitch from '../components/ToggleSwitch';
import DriversTableLayout from '../ui/DriversTableLayout';
import {
  deleteCar,
  getCars,
  selectFilteredAndSortedCars,
  updateCar,
} from '../store/slices/carSlice';
import CarsTableLayout from '../ui/CarsTableLayout';
import BookingsTableLayout from '../ui/BookingsTableLayout';
import {
  getBooking,
  selectFilteredAndSortedBooks,
} from '../store/slices/boookSlice';

function Cars() {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = (value) => {
    setToggled(value);
    // Additional logic if needed
  };
  // get user call
  const dispatch = useDispatch();
  const { deleteLoad, updateLoad, isLoading, createLoad, error } = useSelector(
    (state) => state.entities.bookings
  );

  useEffect(() => {
    dispatch(getBooking());
  }, [deleteLoad, createLoad, updateLoad, dispatch]);

  // State object to hold user information
  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    yearOfStudy: '',
    faculty: '',
    imageUrl: '',
  });

  const [userIdDelete, setUserIdDelete] = useState(null);

  // Change handler function for updating user information
  const handleInputChange = (name, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // select users into store
  const { paginatedList } = useSelector(selectFilteredAndSortedBooks);

  const passwordRules = {
    required: true,
    minLength: 8,
  };

  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isOverlayOpenEdit, setIsOverlayOpenEdit] = useState(false);
  const [isOverlayOpenDelete, setIsOverlayOpenDelete] = useState(false);
  const [userId, setUserId] = useState(null);
  //   const [users, setUsers] = useState(tableData);

  // modal
  const handleOpenEditeModal = (user) => {
    setUserId(user.id);
    setIsActionOpen(true);
    setToggled(user.isActive);
    setUserInfo(user);
    setUserIdDelete(user.id);
  };

  const handleCloseActionsModal = () => {
    setUserId(null);
    setIsActionOpen(false);
  };

  const handleOpenOverlayEdit = () => {
    setIsActionOpen(false);
    setIsOverlayOpenEdit(true);
  };
  const handleOpenOverlayDelete = () => {
    setIsActionOpen(false);
    setIsOverlayOpenDelete(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpenEdit(false);
    setIsOverlayOpenDelete(false);
  };

  const modalRefAction = useOutsideClick(() => {
    handleCloseActionsModal();
  });
  const modalRefOverLay = useOutsideClick(() => {
    handleCloseOverlay();
  });

  // userType
  const userTypes = {
    user: '#3188E7',
    driver: 'purple',
    manager: 'orange',
    admin: 'red',
  };

  const status = {
    active: '#52DF6F',
    inactive: '#FB5559',
  };

  const yearColors = {
    // Customize year colors and labels as needed
    vitz: '#ff0000', // Red
    noha: '#ffa500', // Orange
    Junior: '#0000ff', // Yellow
    probo: '#00ff00', // Green
    M1: '#00ffff', // Cyan
    probox: '#0000ff', // Blue
    recovery: '#800080', // Purple
    M4: '#808080', // Gray
    'Post-M4': '#c0c0c0', // Silver
    M5: '#a0a0a0', // Dark Gray
    M6: '#000000', // Black
  };

  const studentYearMap = {
    1: 'Freshman',
    2: 'Sophomore',
    3: 'Junior',
    4: 'Senior',
    5: 'Post-M4',
    6: 'M5',
    7: 'M6',
  };
  const handleSubmitUpdate = () => {
    const car = { ...userInfo };

    setUserInfo({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      address: '',
      phone: '',
      yearOfStudy: '',
      faculty: '',
      imageUrl: '',
    });

    dispatch(updateCar(car));
    handleCloseOverlay();
  };

  const handleDelete = () => {
    const id = userIdDelete;
    setUserIdDelete(null);

    dispatch(deleteCar(+id));
    handleCloseOverlay();
  };

  return (
    <BookingsTableLayout
      title="All Booking"
      isOpenAction={isActionOpen}
      closedActionsModal={handleCloseActionsModal}
    >
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : (
        <table id="Table">
          <thead>
            <th className="id">id no#</th>
            <th>User id</th>
            <th>schedule Id</th>
            <th>pickupLocation</th>
            <th>Create at</th>
            <th>action</th>
          </thead>
          <tbody>
            {paginatedList?.map((item) => {
              const bg = 'red'; // userTypes[item.userType.toLowerCase()]

              const drivertypeColor = yearColors[item.carType];
              console.log('color', studentYearMap[item.driverType]);
              return (
                <tr key={item.id} className="user-tr">
                  <td className="id">#{item.id}</td>
                  <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                    #{item.userId}
                  </td>

                  <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                    #{item.scheduleId}
                  </td>

                  <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                    {item.pickuplocation}
                  </td>
                  <td>{item.createdAt}</td>
                  <td>
                    <div
                      id="actions"
                      onClick={() => handleOpenEditeModal(item)}
                    >
                      <img src={actionIcon} alt="action" />
                    </div>
                    {isActionOpen && userId === item.id && (
                      <ActionsModal
                        openEditModal={handleOpenOverlayEdit}
                        openDeleteModal={handleOpenOverlayDelete}
                        modalRef={modalRefAction}
                      />
                    )}
                  </td>
                  {isOverlayOpenEdit && (
                    <OverlayModal
                      close={handleCloseOverlay}
                      modalRef={modalRefOverLay}
                      width={60}
                    >
                      <CustomInput
                        label="driver Id"
                        name="firstname"
                        type="text"
                        placeholder="Enter your First name"
                        value={userInfo.driverId}
                        onChange={(value) =>
                          handleInputChange('driverId', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="Car type"
                        name="lastname"
                        type="password"
                        placeholder="Enter your lastname"
                        value={userInfo.carType}
                        onChange={(value) =>
                          handleInputChange('carType', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="Make"
                        name="email"
                        type="password"
                        placeholder="Enter your email"
                        value={userInfo.make}
                        onChange={(value) => handleInputChange('make', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="model"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.model}
                        onChange={(value) => handleInputChange('model', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="year"
                        name="year"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.year}
                        onChange={(value) => handleInputChange('year', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="color"
                        name="phone"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.color}
                        onChange={(value) => handleInputChange('color', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="capacity"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.capacity}
                        onChange={(value) =>
                          handleInputChange('capacity', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="carPlate Number"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.carPlateNumber}
                        onChange={(value) =>
                          handleInputChange('carPlateNumber', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="license Number"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.LicenseNumber}
                        onChange={(value) =>
                          handleInputChange('LicenseNumber', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="Car imag"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.carImg}
                        onChange={(value) => handleInputChange('carImg', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <div className="custom-input-container">
                        <label className="custom-label"></label>
                        <div className="custom-input-box"></div>

                        <div className="input-error-box">
                          <CustomButton
                            label="Cancle"
                            color="white"
                            onClick={handleCloseOverlay}
                          />
                          <span style={{ padding: '.7rem' }}></span>
                          <CustomButton
                            label="edit"
                            color="#4f46e5"
                            onClick={handleSubmitUpdate}
                          />
                        </div>
                      </div>
                    </OverlayModal>
                  )}
                  {isOverlayOpenDelete && (
                    <OverlayModal
                      close={handleCloseOverlay}
                      modalRef={modalRefOverLay}
                      width={35}
                    >
                      <h1 className="overlaymodal-delete">Delete user</h1>
                      <p className="overlaymodal-delete-p">
                        Are you sure you want to delete this cabins permanently?
                        This action cannot be undone.
                      </p>

                      <div className="custom-input-container">
                        <label className="custom-label"></label>
                        <div className="custom-input-box"></div>

                        <div className="input-error-box">
                          <CustomButton
                            label="Cancle"
                            color="white"
                            onClick={handleCloseOverlay}
                          />
                          <span style={{ padding: '.7rem' }}></span>
                          <CustomButton
                            label="delete"
                            color="red"
                            onClick={handleDelete}
                          />
                        </div>
                      </div>
                    </OverlayModal>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {paginatedList.length === 0 && (
        <div className="not-found-message">
          No results found for your this table
        </div>
      )}
    </BookingsTableLayout>
  );
}

export default Cars;
