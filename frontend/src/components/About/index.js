import React, { useEffect } from 'react';
import { getAllEntries } from '../../store/entry';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './about.css'
const AboutMe = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEntries());
    }, [dispatch]);
    const entries = useSelector(state => state.entry);
    const entryArray = Object.values(entries);
    console.log(entryArray);

    if (sessionUser) {
        return (
            <>
             <a className='links' href="https://github.com/Dominisam98">My Github</a>
             <a className='links' href=" https://www.linkedin.com/in/dominique-samuels-b33233197/">My Linkedin</a>
             <p className='p-tag'>This website was developed by Dominique Samuels, a software developer from Hollywood, Florida. She has been coding for over 6 years but finally decided to take this hobby and turn it into a career. She is proficient in Javascript, HTML, CSS, React, Redux, and Ruby. Please check out the links above!</p>
            </>
        )
    } else {
        return (
            <>
                <Redirect to='/' />
            </>
        );
    }
}

export default AboutMe;
