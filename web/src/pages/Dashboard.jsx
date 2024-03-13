// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
// import TableLayout from '../components/TableLayout';
import DashLayout from '../components/DashLayout';
import bookingIcon from '../assets/icons/dash-book.svg';
import scheduleIcon from '../assets/icons/dash-schedule.svg';
import userIcon from '../assets/icons/dash-users.svg';
import driverIcon from '../assets/icons/dash-driver.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBooking,
  selectFilteredAndSortedBooks,
} from '../store/slices/boookSlice';
import actionIcon from '../assets/icons/actions.svg';
import CarTypesPieChart from '../components/CarTypesPieChart';
import { getCars, selectFilteredAndSortedCars } from '../store/slices/carSlice';
import MyLineChart from '../components/MyLineChart';
import CustomButton from '../components/CustomButton';
import { Link } from 'react-router-dom';

function Dashboard() {
  // get user call
  const dispatch = useDispatch();
  const { deleteLoad, updateLoad, isLoading, createLoad, error } = useSelector(
    (state) => state.entities.bookings
  );

  useEffect(() => {
    dispatch(getBooking());
  }, [deleteLoad, createLoad, updateLoad, dispatch]);

  const { paginatedList } = useSelector(selectFilteredAndSortedBooks);

  return (
    <>
      <DashLayout title="Dashboard">
        <div className="dashboard__system__summary">
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0f2fe' }}>
              <img src={userIcon} alt="" />
            </div>
            <div className="systme__summary__box__text">
              <p>Users</p>
              <h1>10</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#dcfce7' }}>
              <img src={bookingIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Bookings</p>
              <h1>11</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#e0e7ff' }}>
              <img src={scheduleIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>schedule</p>
              <h1>8</h1>
            </div>
          </div>
          <div className="systme__summary__box">
            <div className="img-box" style={{ backgroundColor: '#fef9c3' }}>
              <img src={driverIcon} alt="" />
            </div>

            <div className="systme__summary__box__text">
              <p>Drivers</p>
              <h1>17</h1>
            </div>
          </div>
        </div>
        <div className="dashboard__popular">
          <div className="dashboard__populardriver" style={{ padding: '1rem' }}>
            <h1
              style={{
                fontWeight: 'bold',
                marginTop: '2rem',
                marginLeft: '1rem',
                marginBottom: '1.2rem',
                fontSize: '2rem',
              }}
            >
              Latest booking
            </h1>
            <table id="Table">
              <thead>
                <th className="id">id no#</th>
                <th>User id</th>
                <th>schedule Id</th>
                <th>pickupLocation</th>
                <th>Create at</th>
                <th>take look</th>
              </thead>
              <tbody>
                {paginatedList?.slice(0, 5).map((item) => {
                  return (
                    <tr key={item.id} className="user-tr">
                      <td className="id">#{item.id}</td>
                      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                        {item.userId}
                      </td>

                      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                        {item.scheduleId}
                      </td>

                      <td style={{ paddingLeft: '2rem', fontWeight: 'bold' }}>
                        {item.pickuplocation}
                      </td>
                      <td>{item.createdAt}</td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Link to="/bookings">
                            <div
                              style={{
                                backgroundColor: '#2438F6',
                                color: 'white',
                                padding: '10px 20px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                display: 'inline-block',
                                fontSize: '12px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                              }}
                            >
                              Try Look!
                            </div>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="dashboard__popularloction">
            <CarTypesPieChart />
          </div>
        </div>
        <div className="dashboard__overview">
          <div className="dashboard__overview__child">
            <MyLineChart />
          </div>
          <div className="dashboard__overview__child">
            <h1 className="analysis__header">System analaysis</h1>
            <div className="analysis">
              <div className="analysis1" style={{ background: ' #e0f2fe' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={userIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>
                      Students Register
                    </span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
              <div className="analysis1" style={{ background: '#e0e7ff' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={scheduleIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Schedule created</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
              <div className="analysis1" style={{ background: ' #dcfce7' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={bookingIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Booking Of rides</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
              <div className="analysis1" style={{ background: ' #fef9c3' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <img
                      src={driverIcon}
                      alt=""
                      style={{ width: '5rem', height: '5rem' }}
                    />
                    <span style={{ fontWeight: 'bold' }}>Driver register</span>
                  </div>
                  <h1 style={{ marginTop: '5px', color: 'gray' }}>
                    10 last 30 days
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="dashboard__overview__child"></div> */}
        </div>

        <div style={{ height: '4rem' }}></div>
      </DashLayout>
    </>
  );
}

export default Dashboard;
