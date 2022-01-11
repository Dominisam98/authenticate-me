// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './nav.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='logSign'>
        <NavLink id="login" to="/login">Log In</NavLink>
        <NavLink id="signup" to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
  <>
    <h1>SweetNote</h1>
    <ul>
      <li className='logSign'>
        <NavLink id="home" exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  </>
  );
}

export default Navigation;
