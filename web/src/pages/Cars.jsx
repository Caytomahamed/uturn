import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import actionIcon from '../assets/icons/actions.svg';
import carIcon from '../assets/icons/carIcon.svg';
import { v4 as uuidv4 } from 'uuid';

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
import Alert from '../components/Alert';

function Cars() {
  const [isToggled, setToggled] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const handleToggle = (value) => {
    setToggled(value);
    // Additional logic if needed
  };
  // get user call
  const dispatch = useDispatch();
  const { deleteLoad, updateLoad, isLoading, createLoad, error } = useSelector(
    (state) => state.entities.cars
  );

  useEffect(() => {
    dispatch(getCars());
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
  const { paginatedList } = useSelector(selectFilteredAndSortedCars);

  const passwordRules = {
    required: true,
    minLength: 8,
  };
  const stringRules = {
    required: true,
    minLength: 1,
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
  const showAlert = (message, type, id) => {
    setAlerts([...alerts, { message, type, id }]); // Add new alert to the array
  };

  const handleAlertClose = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id)); // Remove closed alert
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
    const alertId = uuidv4();
    showAlert('Car updated successfully', 'success', alertId);
  };

  const handleDelete = () => {
    const id = userIdDelete;
    setUserIdDelete(null);

    dispatch(deleteCar(+id));
    handleCloseOverlay();
    const alertId = uuidv4();
    showAlert('Car delete successfully', 'error', alertId);
  };

  return (
    <CarsTableLayout
      title="All cars"
      isOpenAction={isActionOpen}
      closedActionsModal={handleCloseActionsModal}
    >
      {alerts.map((alert) => (
        <Alert key={alert.id} onClose={handleAlertClose} type={alert.type}>
          {alert.message}
        </Alert>
      ))}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading />
        </div>
      ) : (
        <table id="Table">
          <thead>
            <th className="id">id no#</th>
            <th>Car image</th>
            <th>car info</th>
            <th>Car type</th>
            <th>driver id</th>
            <th>status</th>
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
                  <td className="table-user-profile">
                    <div>
                      <div
                        className="table-user-profile-box"
                        style={{ width: '6rem', height: '6rem' }}
                      >
                        {`${item.carImg}`.startsWith('file') ? (
                          <img
                            src={`http://localhost:9000/uploads/${item.carImg}`}
                            alt="image"
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <img
                            src={item.carImg}
                            alt="image"
                            style={{ objectFit: 'contain' }}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <h2>
                        {item.model} {item.make}
                      </h2>
                      <p>{item.email}</p>
                      <p className="table-user-profile-address">
                        color: {item.color}
                      </p>
                    </div>
                  </td>

                  <td>
                    capacity:{' '}
                    <span style={{ color: 'red' }}>[{item.capacity}]</span>{' '}
                    booked:{' '}
                    <span style={{ color: 'red' }}>[{item.bookedSeats}]</span>{' '}
                    <br />
                    Left:{' '}
                    <span style={{ color: 'red' }}>
                      [{item.seatsLeft}]
                    </span>{' '}
                  </td>

                  <td>
                    <div
                      className="userType"
                      style={{
                        color: drivertypeColor || 'black',
                        borderColor: drivertypeColor || 'black',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        fontWeight: 'bold',
                      }}
                    >
                      <p>{item.carType}</p>
                    </div>
                  </td>
                  <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                    #{item.driverId}
                  </td>
                  <td>
                    <span style={{ fontWeight: 'bold' }}>PlateNo: </span>
                    {item.carPlateNumber}
                    <br />
                    <p style={{ marginTop: '5px' }}></p>
                    <span style={{ fontWeight: 'bold' }}>LicenseNO: </span>
                    {item.LicenseNumber}
                    <br />
                  </td>
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
                        name="driverId"
                        type="text"
                        placeholder="Enter your First name"
                        value={userInfo.driverId}
                        onChange={(value) =>
                          handleInputChange('driverId', value)
                        }
                        validationRules={stringRules}
                        errorMessage="DriverId is required"
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
                        validationRules={stringRules}
                        errorMessage="Car type is required"
                      />
                      <CustomInput
                        label="Make"
                        name="email"
                        type="password"
                        placeholder="Enter Make"
                        value={userInfo.make}
                        onChange={(value) => handleInputChange('make', value)}
                        validationRules={stringRules}
                        errorMessage="Make is required"
                      />
                      <CustomInput
                        label="model"
                        name="password"
                        type="password"
                        placeholder="Enter make"
                        value={userInfo.model}
                        onChange={(value) => handleInputChange('model', value)}
                        validationRules={passwordRules}
                        errorMessage="Model is required"
                      />
                      <CustomInput
                        label="year"
                        name="year"
                        type="password"
                        placeholder="Enter year"
                        value={userInfo.year}
                        onChange={(value) => handleInputChange('year', value)}
                        validationRules={passwordRules}
                        errorMessage="Year is required"
                      />
                      <CustomInput
                        label="color"
                        name="phone"
                        type="password"
                        placeholder="Enter color"
                        value={userInfo.color}
                        onChange={(value) => handleInputChange('color', value)}
                        validationRules={stringRules}
                        errorMessage="Color is required"
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
                        errorMessage="capacity is required"
                      />
                      <CustomInput
                        label="carPlate Number"
                        name="password"
                        type="password"
                        placeholder="Enter carPlate Number"
                        value={userInfo.carPlateNumber}
                        onChange={(value) =>
                          handleInputChange('carPlateNumber', value)
                        }
                        validationRules={stringRules}
                        errorMessage="carPlate Number is required"
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
                        validationRules={stringRules}
                        errorMessage="license Number is required"
                      />
                      <CustomInput
                        label="Car imag"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.carImg}
                        onChange={(value) => handleInputChange('carImg', value)}
                        validationRules={passwordRules}
                        errorMessage="Car image is required"
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
    </CarsTableLayout>
  );
}

export default Cars;
