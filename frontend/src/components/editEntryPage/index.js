import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneEntry, updateEntry, deleteEntry, getAllEntries, createEntry } from "../../store/entry";
import { useParams, useHistory, Redirect, NavLink } from "react-router-dom";
import './editEntry.css'

const EditEntryForm = () => {
    const { entryId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOneEntry(entryId))
    }, [dispatch, entryId]);

    const entry = useSelector(state => state.entry[entryId]);
    const sessionUser = useSelector(state => state.session.user);

    const [title, setTitle] = useState(entry?.title);
    const [body, setBody] = useState(entry?.body);
    const updateTitle = e => setTitle(e.target.value);
    const updateBody = e => setBody(e.target.value);
    const dhandleSubmit = async e => {
        e.preventDefault();
        dispatch(deleteEntry(entryId));
        history.push(`/entries`);
    }
    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            ...entry,
            title,
            body
        };
     await dispatch(updateEntry(payload));

        // await dispatch(updateEntry(payload));
        await dispatch(getAllEntries());

     history.push(`/entries`);
    }
    if (sessionUser) {
        return (
            <>
                <form id='new-entry' onSubmit={handleSubmit}>
                    <input
                        className="namebox"
                        type='text'
                        value={title}
                        onChange={updateTitle}

                    />
                    <textarea
                        className="textbox"
                        value={body}
                        onChange={updateBody}

                    />

                        <button className="save"  type='submit'>Edit</button>

                    <NavLink to='/entries'>
                            <button
                                className='save'
                                id='del-button'
                                onClick={dhandleSubmit}
                            >Delete
                            </button>
                        </NavLink>
                </form>
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

export default EditEntryForm;
