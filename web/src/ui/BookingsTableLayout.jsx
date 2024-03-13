// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import profileImage from '../assets/images/person.jpg';

// menus
import Menu from '../components/Menu';

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
} from '../store/slices/driverSlice';
import CustomButton from '../components/CustomButton';
import OverlayModal from '../components/OverlayModal';
import CustomInput from '../components/CustomInput';
import {
  createCar,
  selectFilteredAndSortedCars,
} from '../store/slices/carSlice';

// eslint-disable-next-line react/prop-types
function BookingsTableLayout(props) {
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
    (state) => state.entities.cars
  );

  const { startIndex, endIndex } = useSelector(selectFilteredAndSortedCars);

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
  const { paginatedList } = useSelector(selectFilteredAndSortedCars);

  const groupByAddress = groupBy(paginatedList, 'address');
  const groupByYear = groupBy(paginatedList, 'driverType');

  // State object to hold user information
  const [userInfo, setUserInfo] = useState({
    driverId: null,
    carImg: '',
    carType: '',
    make: '',
    model: '',
    year: null,
    color: '',
    capacity: null,
    carPlateNumber: '',
    LicenseNumber: '',
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

  const handleCreateDriver = () => {
    dispatch(createCar(userInfo));
    handleCloseOverlay();
    setUserInfo({
      driverId: null,
      carImg: '',
      carType: '',
      make: '',
      model: '',
      year: null,
      color: '',
      capacity: null,
      carPlateNumber: '',
      LicenseNumber: '',
    });
  };

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
            {children}
          </div>

          {/* create new drive modal */}
          {isCreate && (
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
                onChange={(value) => handleInputChange('driverId', value)}
                validationRules={passwordRules}
                errorMessage="At least 8 characters long."
              />
              <CustomInput
                label="Car type"
                name="lastname"
                type="password"
                placeholder="Enter your lastname"
                value={userInfo.carType}
                onChange={(value) => handleInputChange('carType', value)}
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
                onChange={(value) => handleInputChange('capacity', value)}
                validationRules={passwordRules}
                errorMessage="At least 8 characters long."
              />
              <CustomInput
                label="carPlate Number"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={userInfo.carPlateNumber}
                onChange={(value) => handleInputChange('carPlateNumber', value)}
                validationRules={passwordRules}
                errorMessage="At least 8 characters long."
              />
              <CustomInput
                label="license Number"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={userInfo.LicenseNumber}
                onChange={(value) => handleInputChange('LicenseNumber', value)}
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

export default BookingsTableLayout;
