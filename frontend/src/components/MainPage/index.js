import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Main.css';



function MainPage({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const login = e => {
        e.preventDefault();
        dispatch(sessionActions.login({
            credential: 'Demo-lition',
            password: 'password'
        }));
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>

            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='home'>
                    <img className='home' alt='welcome-gif' src='https://media.giphy.com/media/dxDAKjYybPPkE1pfvp/giphy.gif' />
                    <button className='home' id='button' onClick={login}>DEMO USER</button>
                </div>
            </>
        );
    }

    return (
        <div id='main'>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default MainPage;
