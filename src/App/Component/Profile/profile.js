import React from "react";
import _ from "lodash";
import "./profile.css";
import NavbarHome from "../Header/NavbarHome";
import "react-dropdown/style.css";

function Profile(props) {
  const userDetails = JSON.parse(localStorage.setItem('userDetails'));
  console.log(userDetails, 'userDetais');
  return (
    <div>
      <NavbarHome />
      <div className="container">
        <header>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </header>
        <main>
          <div className="profile-container">
            <div className="left">
              <div className="photo-left">
                <img
                  className="photo"
                  src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                />
                <div className="active"></div>
              </div>
              <h4 className="name">{userDetails.username}</h4>
              <p className="info">Customer</p>
              <p className="info">{userDetails.email}</p>
              <div className="stats row">
                <div className="stat col-xs-4">
                  <p className="number-stat">8986712124</p>
                  <p className="desc-stat">Contact</p>
                </div>
                <div className="stat col-xs-4">
                  <p className="number-stat">Boston</p>
                  <p className="desc-stat">Address</p>
                </div>
                <div className="stat col-xs-4">
                  <p className="number-stat">Medicine</p>
                  <p className="desc-stat">Department</p>
                </div>
              </div>
              <p className="desc">Medical Care</p>
              <button className="logout-button">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
