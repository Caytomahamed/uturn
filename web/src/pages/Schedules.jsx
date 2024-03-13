// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ScheduleTableLayout from '../components/ScheduleTableLayout';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  deleteSchedule,
  selectFilteredAndSortedSchedule,
  selectSchedules,
  updateSchedule,
} from '../store/slices/schedules';
import OverlayModal from '../components/OverlayModal';
import { useOutsideClick } from '../hooks/useOutsideClick';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Alert from '../components/Alert';

const getRandomColor = () => {
  var letters = [
    'linear-gradient(to right bottom, #ffb900d9, #ff7730d9)',
    'linear-gradient(to right bottom, #7ed56fd9, #28b485d9)',
    'linear-gradient(to right bottom, #2998ffd9, #5643fad9)',
    'linear-gradient(to right bottom,#c084fc,#581c87)',
    'linear-gradient(to right bottom,#f472b6,#701a75)',
    'linear-gradient(to right bottom, #fdba74,#c2410c)',
    'linear-gradient(to right bottom, #74ebd5,#acb6e5 )',
    'linear-gradient(to right bottom, #1cb5e0,#000046)',
    'linear-gradient(to right bottom, #cbb4d4,#20002c)',
  ];

  return letters[Math.floor(Math.random() * letters.length)];
};

function getFirstColor(gradientStr) {
  const match = gradientStr.match(/^linear-gradient\(.+?,(.+?)\s*,/);
  if (match) {
    return match[1]; // Return the captured color
  } else {
    return null; // Handle invalid gradient strings
  }
}

function Schedules() {
  const [userInfo, setUserInfo] = useState({
    driverId: '',
    routeId: '',
  });
  const { list } = useSelector(selectSchedules);
  const { paginatedList } = useSelector(selectFilteredAndSortedSchedule);

  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

  const openCreateModel = (item) => {
    setId(item.scheduleId);
    setIsEdit(true);
    setUserInfo(item);
  };

  const closeCreateModel = () => {
    setIsEdit(false);
  };

  const stringRules = {
    required: true,
    minLength: 1,
  };

  const handleInputChange = (name, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();

  const [alerts, setAlerts] = useState([]);
  const closeDeleteModel = () => {
    setIsOverlayOpenDelete(false);
  };
  const handleCloseOverlay = () => {
    closeCreateModel();
    closeDeleteModel();
  };

  const showAlert = (message, type, id) => {
    setAlerts([...alerts, { message, type, id }]); // Add new alert to the array
  };

  const handleUpdateSchedule = () => {
    dispatch(
      updateSchedule(id, {
        routeId: userInfo.routeId,
        driverId: userInfo.driverId,
      })
    );
    const alertId = uuidv4();
    handleCloseOverlay();
    showAlert('Schedule updated successfully', 'success', alertId);
    setUserInfo({
      driverId: '',
      routeId: '',
    });
    setId(null);
  };

  const handleAlertClose = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id)); // Remove closed alert
  };

  //ALTERT

  const [isOverlayOpenDelete, setIsOverlayOpenDelete] = useState(false);

  const handleDelete = () => {
    dispatch(deleteSchedule(+id));
    handleCloseOverlay();
    const alertId = uuidv4();
    showAlert('Schedule delete successfully', 'error', alertId);
    setId(null);
  };

  const openDeleteModel = (item) => {
    setId(item.scheduleId);
    setIsOverlayOpenDelete(true);
  };

  const modalRefOverLay = useOutsideClick(() => {
    handleCloseOverlay();
    closeDeleteModel();
  });

  return (
    <ScheduleTableLayout title="All schedules">
      {alerts.map((alert) => (
        <Alert key={alert.id} onClose={handleAlertClose} type={alert.type}>
          {alert.message}
        </Alert>
      ))}
      <div
        className="row--1"
        style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5rem' }}
      >
        {paginatedList &&
          paginatedList.map((d) => {
            const color = getRandomColor();
            const firstColor = getFirstColor(color);
            const bg = `url('https://images.pexels.com/photos/2174715/pexels-photo-2174715.jpeg?auto=compress&cs=tinysrgb&w=600'),${color}`;
            return (
              <div className="col-1-of-3" data-id="11" key={d.id}>
                <div className="card" data-id="11">
                  <div className="card__side card__side--front">
                    <div
                      className="card__picture card__picture--1"
                      style={{ backgroundImage: bg }}
                    >
                      &nbsp;
                    </div>
                    <h4 className="card__heading">
                      <span
                        className="card__heading-span card__heading-span--1"
                        style={{ backgroundImage: color }}
                      >
                        {d.start} to {d.finish}
                      </span>
                    </h4>
                    <div className="card__details">
                      <ul>
                        <li>
                          🚓scheduleId{' '}
                          <span style={{ color: firstColor }}>
                            [{d.scheduleId}]
                          </span>
                        </li>
                        <li>
                          🚗DriverId:
                          <span style={{ color: firstColor }}>
                            [{d.driverId}]{' '}
                          </span>
                        </li>
                        <li>
                          🛣RouteId:
                          <span style={{ color: firstColor }}>
                            [{d.routeId}]{' '}
                          </span>
                        </li>
                        <li>
                          💺Seats left:
                          <span style={{ color: firstColor }}>
                            [{d.seatsLeft}]
                          </span>
                        </li>
                        <li>
                          🪑Bookedseats:
                          <span style={{ color: firstColor }}>
                            [{d.bookedSeats}]
                          </span>
                        </li>
                        <li>
                          💵price:
                          <span style={{ color: firstColor }}>
                            [${d.price}]
                          </span>
                        </li>
                        <li>
                          🎓Capacity
                          <span style={{ color: firstColor }}>
                            [{d.capacity}]
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="card__side card__side--back card__side--back-1"
                    style={{ backgroundImage: color }}
                  >
                    <div className="card__cta">
                      <div className="card__price-box">
                        <p className="card__price-only">Only</p>
                        <p className="card__price-value">
                          ${Math.floor(d.price)}
                        </p>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <button
                          className="btn btn--white editeBtn"
                          onClick={() => openCreateModel(d)}
                        >
                          Edite!
                        </button>
                        <button
                          className="btn btn--white deleteBtn"
                          style={{ marginTop: '1.5rem' }}
                          onClick={() => openDeleteModel(d)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {isOverlayOpenDelete && (
          <OverlayModal
            close={handleCloseOverlay}
            modalRef={modalRefOverLay}
            width={35}
          >
            <h1 className="overlaymodal-delete">Delete user</h1>
            <p className="overlaymodal-delete-p">
              Are you sure you want to delete this cabins permanently? This
              action cannot be undone.
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
        {isEdit && (
          <OverlayModal
            close={handleCloseOverlay}
            modalRef={modalRefOverLay}
            width={50}
          >
            <h1 style={{ color: 'black', fontSize: '3rem', marginBottom: 30 }}>
              Update Schedule
            </h1>
            <CustomInput
              label="RouteId"
              name="routeId"
              type="text"
              placeholder="Enter RouteId"
              value={userInfo.routeId}
              onChange={(value) => handleInputChange('routeId', value)}
              validationRules={stringRules}
              errorMessage="routeId is required"
            />
            <CustomInput
              label="DriverId"
              name="driverId"
              type="password"
              placeholder="Enter DriverId"
              value={userInfo.driverId}
              onChange={(value) => handleInputChange('driverId', value)}
              validationRules={stringRules}
              errorMessage="driverId is required"
            />
            <div className="custom-input-container">
              <label className="custom-label"></label>
              <div className="custom-input-box"></div>

              <div className="input-error-box">
                <CustomButton
                  label="Cancle"
                  color="white"
                  onClick={closeCreateModel}
                />
                <span style={{ padding: '.7rem' }}></span>
                <CustomButton
                  label="create"
                  color="#4f46e5"
                  onClick={handleUpdateSchedule}
                />
              </div>
            </div>
          </OverlayModal>
        )}
      </div>
    </ScheduleTableLayout>
  );
}

export default Schedules;
