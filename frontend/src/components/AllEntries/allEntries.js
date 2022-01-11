import React, { useEffect } from 'react';
import { getAllEntries } from '../../store/entry';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';

const AllEntries = ({ isLoaded }) => {
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
                <div className='grid-container'>
                    {isLoaded && entryArray.map(entry => (
                        <NavLink className='entries' to={`/cookbooks/${entry?.cookbook_id}/entries/${entry?.id}`}>
                            <div className='entry-card' key={`${entry?.id}`}>
                                <h4 className='entry-card'>{entry?.title}</h4>
                                <p className='entry-card'>{entry?.body}</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </>
        )
    } else {
        return (
            <>
                <Redirect to='/error-user' />
            </>
        );
    }
}

export default AllEntries;
