// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { NavLink, useParams } from 'react-router-dom';
// import { getOneEntry, deleteEntry } from '../../store/entry';
// import { useHistory, Redirect } from 'react-router-dom';


// const EntryDetail = () => {
//     const { entryId } = useParams();
//     const dispatch = useDispatch();
//     const history = useHistory();

//     useEffect(() => {
//         dispatch(getOneEntry(entryId));
//     }, [dispatch, entryId]);


//     const entry = useSelector(state => state.entry[entryId]);
//     const sessionUser = useSelector(state => state.session.user);

//     const handleSubmit = async e => {
//         e.preventDefault();
//         dispatch(deleteEntry(entryId));
//         history.push(`/entries`);
//     }

//     if (sessionUser) {
//         return (
//             <>
//                 <div className='entry-detail'>
//                     <h2 className='entry-detail'>{entry?.title}</h2>
//                     <p className='entry-detail'>{entry?.body}</p>
//                     <div className='options'>
//                         <NavLink to={`/edit/${entry?.id}`}>
//                             <button
//                                 className='options'
//                                 id='edit-button'
//                             >
//                                 Edit
//                             </button>
//                         </NavLink>
//                         <NavLink to='/entries'>
//                             <button
//                                 className='options'
//                                 id='del-button'
//                                 onClick={handleSubmit}
//                             >
//                                 Delete
//                             </button>
//                         </NavLink>
//                     </div>
//                 </div>
//             </>
//         )
//     } else {
//         return (
//             <>
//                 <Redirect to='/error-user' />
//             </>
//         );
//     }
// }

// export default EntryDetail;
