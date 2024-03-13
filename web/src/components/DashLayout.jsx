// eslint-disable-next-line no-unused-vars
import React from 'react';
import Logo from '../assets/images/logo.png';
import profileImage from '../assets/images/person.jpg';

// menu
import Menu from './Menu';

// icons
import logoutIcon from '../assets/icons/logout.svg';
import profileIcon from '../assets/icons/profile-icon.svg';

// eslint-disable-next-line react/prop-types
const DashLayout = ({ children, title }) => {
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

          {children}
        </div>
      </div>
    </section>
  );
};

export default DashLayout;
