// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import profileImage from '../assets/images/person.jpg';

// menus
import Menu from '../components/Menu';
import { v4 as uuidv4 } from 'uuid';

// icons
import filterIcon from '../assets/icons/filter.svg';
import sortIcon from '../assets/icons/sort.svg';
import logoutIcon from '../assets/icons/logout.svg';
import searchIcon from '../assets/icons/search.svg';
import profileIcon from '../assets/icons/profile-icon.svg';

// models
import FilterModal from '../components/FilterModal';
import SortMadal from '../components/SortMadal';
import Pagination from '../components/Pagination';
import ItemsPerPageShow from '../components/ItemsPerPageShow';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentPage,
  setFilter,
  setFilterColumn,
  setSearchQuery,
  setSortKey,
  setSortOrder,
  selectFilteredAndSortedDrivers,
  createDriver,
} from '../store/slices/driverSlice';
import CustomButton from '../components/CustomButton';
import OverlayModal from '../components/OverlayModal';
import CustomInput from '../components/CustomInput';
import { createRoute } from '../store/slices/routeSlice';
import Alert from '../components/Alert';

// eslint-disable-next-line react/prop-types
function RoutesTableLayout(props) {
  // eslint-disable-next-line react/prop-types
  const { children, title } = props;
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const openFilterModel = () => {
    setIsOpenFilter(true);
  };

  const closeFilterModel = () => {
    setIsOpenFilter(false);
  };

  const modalRefFilter = useOutsideClick(() => {
    closeFilterModel();
  });

  const openSortModel = () => {
    setIsOpenSort(true);
  };

  const closeSortModel = () => {
    setIsOpenSort(false);
  };
  const modalRefSort = useOutsideClick(() => {
    closeSortModel();
  });

  // usersPage search
  const dispatch = useDispatch();
  const { list, searchQuery, filter, sortKey, sortOrder } = useSelector(
    (state) => state.entities.drivers
  );

  const { startIndex, endIndex } = useSelector(selectFilteredAndSortedDrivers);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1));
  };

  const handleFilter = (selectedFilter, column) => {
    dispatch(setFilterColumn(column));
    dispatch(setFilter(selectedFilter));
    dispatch(setCurrentPage(1));
  };

  const handleSortChange = (e) => {
    const selectedSortKey = e.target.value;
    const selectedOption = e.target[e.target.selectedIndex];
    const newSortOrder = selectedOption.dataset.sortorder;
    console.log('target', selectedOption.dataset.sortorder);

    console.log('new Sort ', newSortOrder, 'old', sortOrder);

    if (newSortOrder !== sortOrder || !sortOrder)
      dispatch(setSortOrder(newSortOrder));

    dispatch(setSortKey(selectedSortKey));
    dispatch(setCurrentPage(1)); // Reset to the first page after sorting
  };

  const groupBy = (array, column) => {
    const group = array.reduce((acc, obj) => {
      const key = obj[column];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    return Object.keys(group);
  };

  // select users into store
  const { paginatedList } = useSelector(selectFilteredAndSortedDrivers);

  const groupByAddress = groupBy(paginatedList, 'address');
  const groupByYear = groupBy(paginatedList, 'driverType');

  // State object to hold user information
  const [userInfo, setUserInfo] = useState({
    price: '',
    start: '',
    finish: '',
    description: '',
  });

  const passwordRules = {
    required: true,
    minLength: 8,
  };

  // Change handler function for updating user information
  const handleInputChange = (name, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const openCreateModel = () => {
    setIsCreate(true);
  };

  const closeCreateModel = () => {
    setIsCreate(false);
  };

  const handleCloseOverlay = () => {
    closeCreateModel();
  };

  const modalRefOverLay = useOutsideClick(() => {
    handleCloseOverlay();
  });

  const [alerts, setAlerts] = useState([]);
  const handleAlertClose = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id)); // Remove closed alert
  };
  const showAlert = (message, type, id) => {
    setAlerts([...alerts, { message, type, id }]); // Add new alert to the array
  };

  const handleCreateDriver = () => {
    dispatch(createRoute(userInfo));
    handleCloseOverlay();
    setUserInfo({
      price: '',
      start: '',
      finish: '',
      description: '',
    });
    const alertId = uuidv4();
    showAlert('Route create successfully', 'success', alertId);
  };

  const stringRules = {
    required: true,
    minLength: 1,
  };

  console.log('userInfo', userInfo);

  return (
    <section className="dashboard">
      <div className="dashboard__sidebar">
        <div>
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Uturn</h1>
          </div>
          <div className="dashboard__menu">
            <Menu />
          </div>
        </div>
      </div>

      <div className="dashboard__content">
        <div className="dashboard__profile">
          <div className="dashboard__profile_box">
            <div className="dashboard__profile__image">
              <img src={profileImage} alt="profile" />
            </div>
            <h3>user Name</h3>
          </div>
          <div className="dashboard__profile_icon">
            <img src={profileIcon} alt="profileicon" />
            <img src={logoutIcon} alt="logouticon" />
          </div>
        </div>
        <div className="dashboard__content--main">
          <h1 className="header">{title}</h1>
          <div className="table__box">
            <div className="table__ssf">
              <div className="search__input">
                <img src={searchIcon} alt="search icon" />
                <input
                  type="text"
                  placeholder="Stander searching"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              <button className="filter" onClick={openFilterModel}>
                <img src={filterIcon} alt="filter icon" />
                <h3>filter</h3>
                {isOpenFilter && (
                  <FilterModal modalRef={modalRefFilter}>
                    <select
                      id="selectsFilter"
                      value={filter}
                      onChange={(e) => handleFilter(e.target.value, 'address')}
                    >
                      <option value="" selected>
                        Filter by address
                      </option>
                      {groupByAddress.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <select
                      id="selectsFilter"
                      value={filter}
                      onChange={(e) =>
                        handleFilter(e.target.value, 'driverType')
                      }
                    >
                      <option value="" selected>
                        Filter by years
                      </option>
                      {groupByYear.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FilterModal>
                )}
              </button>
              <button className="sort" onClick={openSortModel}>
                <img src={sortIcon} alt="sort icon" />
                <h3>sort</h3>
                {isOpenSort && (
                  <SortMadal modalRef={modalRefSort}>
                    <select
                      id="selectsSort"
                      value={sortKey}
                      onChange={handleSortChange}
                    >
                      <option value="firstname" data-sortOrder="asc">
                        Sort by Firstname(ascending)
                      </option>
                      <option value="firstname" data-sortOrder="desc">
                        Sort by Firstname(descending)
                      </option>
                      <option value="lastname" data-sortOrder="asc">
                        Sort by lastname(ascending)
                      </option>
                      <option value="lastname" data-sortOrder="desc">
                        Sort by Lastname(descending)
                      </option>
                      <option value="address" data-sortOrder="asc">
                        Sort by Address(ascending)
                      </option>
                    </select>
                  </SortMadal>
                )}
              </button>

              <div style={{ position: 'absolute', right: 0, top: '-5px' }}>
                <CustomButton label="create new " onClick={openCreateModel} />
              </div>
            </div>
            {alerts.map((alert) => (
              <Alert
                key={alert.id}
                onClose={handleAlertClose}
                type={alert.type}
              >
                {alert.message}
              </Alert>
            ))}
            {children}
          </div>

          {/* create new drive modal */}
          {isCreate && (
            <OverlayModal
              close={handleCloseOverlay}
              modalRef={modalRefOverLay}
              width={60}
            >
              <h1
                style={{
                  marginTop: '1rem',
                  marginBottom: '2rem',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                }}
              >
                Add New route
              </h1>
              <CustomInput
                label="From"
                name="firstname"
                type="text"
                placeholder="Enter from or start"
                value={userInfo.start}
                onChange={(value) => handleInputChange('start', value)}
                validationRules={stringRules}
                errorMessage="From is required "
              />
              <CustomInput
                label="To"
                name="lastname"
                type="password"
                placeholder="Enter your lastname"
                value={userInfo.finish}
                onChange={(value) => handleInputChange('finish', value)}
                validationRules={stringRules}
                errorMessage="To is required."
              />

              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <label style={{ fontWeight: 'bold' }}>Description:</label>
                <textarea
                  value={userInfo.description}
                  onChange={(event) =>
                    handleInputChange('description', event.target.value)
                  }
                  style={{
                    marginLeft: '17.5rem',
                    borderColor: '#ccc',
                    width: '22.5rem',
                    height: '14rem',
                  }}
                />
              </div>
              <CustomInput
                label="Price"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={userInfo.price}
                onChange={(value) => handleInputChange('price', value)}
                validationRules={stringRules}
                errorMessage="Price is required"
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
                    onClick={handleCreateDriver}
                  />
                </div>
              </div>
            </OverlayModal>
          )}

          <div className="pagination">
            <div className="showing-result">
              <p>
                Showing <span id="show-page">{startIndex + 1}</span> to
                <span id="show-page"> {endIndex}</span> of
                <span id="show-page"> {list.length}</span> results
              </p>
            </div>

            <Pagination />

            <div className="showiteminpage">
              <h1>Show items in one page</h1>
              <ItemsPerPageShow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoutesTableLayout;
