import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEntry } from "../../store/entry";
import { useHistory, Redirect, useParams } from "react-router-dom";
import './createEntry.css'

const CreateEntryForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { entryId } = useParams();

     console.log(entryId)

    const updateTitle = e => setTitle(e.target.value);
    const updateBody = e => setBody(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            title,
            body,
            entry_id: entryId
        };

        const entry = await dispatch(createEntry(payload));
        if (entry) history.push(`/entries`);
    }
    if (sessionUser) {
        return (
            <>
                <form id='new-entry' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name of pastry'
                        value={title}
                        onChange={updateTitle}
                        required
                    />
                    <textarea
                        placeholder='Create your pastry here...'
                        value={body}
                        onChange={updateBody}
                        required
                    />
                    <button type='submit' onSubmit={handleSubmit}>Save</button>
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

export default CreateEntryForm;
