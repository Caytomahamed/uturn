import './Students.css';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import StudentTableLayout from '../ui/StudentTableLayout';

import actionIcon from '../assets/icons/actions.svg';
import personImg from '../assets/images/person.jpg';

import ActionsModal from '../components/ActionsModal';
import OverlayModal from '../components/OverlayModal';
import { useOutsideClick } from '../hooks/useOutsideClick';
import CustomInput from '../components/CustomInput';

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getUsers,
  selectFilteredAndSortedUsers,
  updateUser,
} from '../store/slices/userSlice';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import ToggleSwitch from '../components/ToggleSwitch';

function Users() {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = (value) => {
    setToggled(value);
    // Additional logic if needed
  };
  // get user call
  const dispatch = useDispatch();
  const { deleteLoad, updateLoad, isLoading, error } = useSelector(
    (state) => state.entities.users
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [deleteLoad, updateLoad, dispatch]);

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
  const { paginatedList } = useSelector(selectFilteredAndSortedUsers);

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
    setUserInfo(user);
    setToggled(user.isActive);
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
    M2: '#0000ff', // Blue
    M3: '#800080', // Purple
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

    dispatch(updateUser({ ...user, roleId: role, isActive: isToggled }));
    handleCloseOverlay();
  };

  const handleDelete = () => {
    const id = userIdDelete;
    setUserIdDelete(null);

    dispatch(deleteUser(+id));
    handleCloseOverlay();
  };

  return (
    <StudentTableLayout
      title="All student"
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
            <th>user profile</th>
            {/* <th>address</th> */}
            <th>faculty</th>
            <th>Year</th>
            <th>phone</th>
            <th>type user</th>
            <th>status</th>
            <th>action</th>
          </thead>
          <tbody>
            {paginatedList?.map((item) => {
              const bg = userTypes[item.userType.toLowerCase()];
              const year = studentYearMap[item.yearOfStudy];
              const yearColor = yearColors[year];
              return (
                <tr key={item.id} className="user-tr">
                  <td className="id">#{item.id}</td>
                  <td className="table-user-profile">
                    <div>
                      <div className="table-user-profile-box">
                        <img src={personImg} alt="image" />
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
                  {/* <td>{item.address}</td> */}
                  <td>
                    <p>{`${item.faculty}`.slice(0, 14)}...</p>
                  </td>
                  <td>
                    <div
                      className="userType"
                      style={{
                        color: yearColor || 'black',
                        borderColor: yearColor || 'black',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        fontWeight: 'bold',
                      }}
                    >
                      <p>{year}</p>
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
                      <h1></h1>
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
                        label="yearOfStudy"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={userInfo.yearOfStudy}
                        onChange={(value) =>
                          handleInputChange('yearOfStudy', value)
                        }
                        validationRules={passwordRules}
                        errorMessage="At least 8 characters long."
                      />
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
                      />
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
    </StudentTableLayout>
  );
}

export default Users;
