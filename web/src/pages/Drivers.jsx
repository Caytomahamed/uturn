import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import StudentTableLayout from '../ui/StudentTableLayout';
import { v4 as uuidv4 } from 'uuid';
import actionIcon from '../assets/icons/actions.svg';
import personImg from '../assets/icons/profile-icon.svg';

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
import Alert from '../components/Alert';

function Drivers() {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = (value) => {
    setToggled(value);
    // Additional logic if needed
  };
  // get user call
  const dispatch = useDispatch();
  const { deleteLoad, updateLoad, isLoading, createLoad, error } = useSelector(
    (state) => state.entities.drivers
  );

  useEffect(() => {
    dispatch(getDrivers());
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

  const [alerts, setAlerts] = useState([]);
  const showAlert = (message, type, id) => {
    setAlerts([...alerts, { message, type, id }]); // Add new alert to the array
  };

  const handleAlertClose = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id)); // Remove closed alert
  };

  const [userIdDelete, setUserIdDelete] = useState(null);

  // Change handler function for updating user information
  const handleInputChange = (name, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // select users into store
  const { paginatedList } = useSelector(selectFilteredAndSortedDrivers);

  const passwordRules = {
    required: true,
    minLength: 8,
  };
  const stringRules = {
    required: true,
    minLength: 1,
  };
  const phoneRules = {
    required: true,
    minLength: 7,
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
    Freshman: '#ff0000', // Red
    Sophomore: '#ffa500', // Orange
    Junior: '#0000ff', // Yellow
    Senior: '#00ff00', // Green
    M1: '#00ffff', // Cyan
    null: '#0000ff', // Blue
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
    let role;
    const user = { ...userInfo };

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

    if (user.userType === 'driver') role = 2;
    if (user.userType === 'user') role = 3;
    if (user.userType === 'admin') role = 1;

    delete user.userType;

    const alertId = uuidv4();
    showAlert('Driver updated successfully', 'success', alertId);
    dispatch(updateDriver({ ...user, roleId: role, isActive: isToggled }));
    handleCloseOverlay();
  };

  const handleDelete = () => {
    const id = userIdDelete;
    setUserIdDelete(null);
    const alertId = uuidv4();
    showAlert('Driver delete successfully', 'error', alertId);

    dispatch(deleteUser(+id));
    handleCloseOverlay();
  };

  return (
    <DriversTableLayout
      title="All drivers"
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
            <th>driver profile</th>
            <th>driver Type</th>
            <th>phone</th>
            <th>type user</th>
            <th>status</th>
            <th>action</th>
          </thead>
          <tbody>
            {paginatedList?.map((item) => {
              const bg = userTypes[item.userType.toLowerCase()];

              const drivertypeColor = yearColors[item.driverType];
              console.log('color', studentYearMap[item.driverType]);
              return (
                <tr key={item.id} className="user-tr">
                  <td className="id">#{item.driverId}</td>
                  <td className="table-user-profile">
                    <div>
                      <div className="table-user-profile-box">
                        {item.imageUrl && item.imageUrl !== 'url_to_image' ? (
                          <img
                            src={`http://localhost:9000/uploads/${item.imageUrl}`}
                            alt="image"
                          />
                        ) : (
                          <img src={personImg} alt="image" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h2>
                        {item.firstname} {item.lastname}
                      </h2>
                      <p>{item.email}</p>
                      <p className="table-user-profile-address">
                        Address: {item.address}
                      </p>
                    </div>
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
                      <p>{item.driverType ? item.driverType : 'normal'}</p>
                    </div>
                  </td>

                  <td>{item.phone}</td>
                  <td>
                    <div
                      className="userType"
                      style={{
                        color: bg || 'black',
                        borderColor: bg || 'black',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }}
                    >
                      <p>{item.userType}</p>
                    </div>
                  </td>
                  <td>
                    <div className="table-isactive">
                      {item.isActive ? (
                        <div
                          className="userType"
                          style={{
                            color: status['active'] || 'black',
                            borderColor: status['active'] || 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            fontWeight: 'bold',
                          }}
                        >
                          <p>Active</p>
                        </div>
                      ) : (
                        <div
                          className="userType"
                          style={{
                            color: status['inactive'] || 'black',
                            borderColor: status['inactive'] || 'black',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            fontWeight: 'bold',
                          }}
                        >
                          <p>Inactive</p>
                        </div>
                      )}
                    </div>
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
                        label="First name"
                        name="firstname"
                        type="text"
                        placeholder="Enter your First name"
                        value={userInfo.firstname}
                        onChange={(value) =>
                          handleInputChange('firstname', value)
                        }
                        validationRules={stringRules}
                        errorMessage="First name ist required"
                      />
                      <CustomInput
                        label="Last name"
                        name="lastname"
                        type="password"
                        placeholder="Enter your lastname"
                        value={userInfo.lastname}
                        onChange={(value) =>
                          handleInputChange('lastname', value)
                        }
                        validationRules={stringRules}
                        errorMessage="Last name is required"
                      />
                      <CustomInput
                        label="email"
                        name="email"
                        type="password"
                        placeholder="Enter your email"
                        value={userInfo.email}
                        onChange={(value) => handleInputChange('email', value)}
                        validationRules={stringRules}
                        errorMessage="Email is required"
                      />
                      <CustomInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.password}
                        onChange={(value) =>
                          handleInputChange('password', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="address"
                        name="address"
                        type="password"
                        placeholder="Enter your Address"
                        value={userInfo.address}
                        onChange={(value) =>
                          handleInputChange('address', value)
                        }
                        validationRules={stringRules}
                        errorMessage="Address is required"
                      />
                      <CustomInput
                        label="phone"
                        name="phone"
                        type="password"
                        placeholder="Enter your phone"
                        value={userInfo.phone}
                        onChange={(value) => handleInputChange('phone', value)}
                        validationRules={phoneRules}
                        errorMessage="Phone is required"
                      />
                      <CustomInput
                        label="DriverType"
                        name="password"
                        type="text"
                        placeholder="Enter your driverType"
                        value={
                          userInfo.driverType ? userInfo.driverType : 'normal'
                        }
                        onChange={(value) =>
                          handleInputChange('driverType', value)
                        }
                        validationRules={stringRules}
                        errorMessage="DriverType is required"
                      />

                      <CustomInput
                        label="ImageUrl"
                        name="ImageUrl"
                        type="password"
                        placeholder="Enter your imageUrl"
                        value={userInfo.imageUrl}
                        onChange={(value) =>
                          handleInputChange('imageUrl', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="Image Url is required"
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label
                          style={{ fontWeight: 'bold', marginRight: '1rem' }}
                        >
                          IsActive:
                        </label>
                        <ToggleSwitch
                          onChange={handleToggle}
                          checked={isToggled}
                        />
                      </div>
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
    </DriversTableLayout>
  );
}

export default Drivers;
