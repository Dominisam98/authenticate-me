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
    <>
      <NavLink id="home" exact to="/">Home</NavLink>
      <NavLink id="home" exact to="/entries/new">New Pastry</NavLink>
      <NavLink id="home" exact to="/entries">Pastry Feed</NavLink>
      <NavLink id="home" exact to="/about">About Me</NavLink>
      <ProfileButton user={sessionUser} />
    </>
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
        {isLoaded && sessionLinks}
      </li>
    </ul>
  </>
  );
}

export default Navigation;
