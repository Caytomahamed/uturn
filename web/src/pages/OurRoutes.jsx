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
  getRoutes,
  selectFilteredAndSortedRoutes,
} from '../store/slices/routeSlice';
import RoutesTableLayout from '../ui/RoutesTableLayout';

function OurRoutes() {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = (value) => {
    setToggled(value);
    // Additional logic if needed
  };
  // get user call
  const dispatch = useDispatch();
  const { deleteLoad, updateLoad, isLoading, createLoad, error } = useSelector(
    (state) => state.entities.routes
  );

  useEffect(() => {
    dispatch(getRoutes());
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
  const { paginatedList } = useSelector(selectFilteredAndSortedRoutes);

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

    dispatch(updateDriver({ ...user, roleId: role, isActive: isToggled }));
    handleCloseOverlay();
  };

  const handleDelete = () => {
    const id = userIdDelete;
    setUserIdDelete(null);

    dispatch(deleteUser(+id));
    handleCloseOverlay();
  };

  return (
    <RoutesTableLayout
      title="All routes"
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
            <th>description</th>
            <th>price</th>
            <th>start</th>
            <th>finish</th>
            <th>action</th>
          </thead>
          <tbody>
            {paginatedList?.map((item) => {
              return (
                <tr key={item.id} className="user-tr">
                  <td className="id">#{item.id}</td>
                  <td
                    style={{
                      width: '50rem',
                      paddingRight: '2rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <div
                      className="userType"
                      style={{
                        color: '#FB5559',
                        borderColor: '#FB5559',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        fontWeight: 'bold',
                      }}
                    >
                      <p>{item.start}</p>
                    </div>
                  </td>
                  <td>
                    <div
                      className="userType"
                      style={{
                        color: '#0000ff',
                        borderColor: '#0000ff',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                      }}
                    >
                      <p>{item.finish}</p>
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
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
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
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="email"
                        name="email"
                        type="password"
                        placeholder="Enter your email"
                        value={userInfo.email}
                        onChange={(value) => handleInputChange('email', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
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
                        placeholder="Enter your password"
                        value={userInfo.address}
                        onChange={(value) =>
                          handleInputChange('address', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="phone"
                        name="phone"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.phone}
                        onChange={(value) => handleInputChange('phone', value)}
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      <CustomInput
                        label="DriverType"
                        name="password"
                        type="text"
                        placeholder="Enter your password"
                        value={
                          userInfo.driverType ? userInfo.driverType : 'normal'
                        }
                        onChange={(value) =>
                          handleInputChange('driverType', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
                      {/*
                      <CustomInput
                        label="faculty"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.faculty}
                        onChange={(value) =>
                          handleInputChange('faculty', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      /> */}
                      <CustomInput
                        label="ImageUrl"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.imageUrl}
                        onChange={(value) =>
                          handleInputChange('imageUrl', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
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
    </RoutesTableLayout>
  );
}

export default OurRoutes;
