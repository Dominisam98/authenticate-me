import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEntry } from "../../store/entry";
import { useHistory, Redirect, useParams } from "react-router-dom";


const CreateEntryForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { cookBookId } = useParams();

    const updateTitle = e => setTitle(e.target.value);
    const updateBody = e => setBody(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            title,
            body,
            cookbook_id: cookBookId
        };

        const entry = await dispatch(createEntry(payload));
        if (entry) history.push(`/cookbooks/${cookBookId}`);
    }
    if (sessionUser) {
        return (
            <>
                <form id='new-entry' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={updateTitle}
                        required
                    />
                    <textarea
                        placeholder='Start typing your entry here...'
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
                <Redirect to='/error-user' />
            </>
        );
    }
}

export default CreateEntryForm;
