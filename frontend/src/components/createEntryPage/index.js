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
                <div id="wrapper">

	            <form id="paper" onSubmit={handleSubmit}>

		        <div id="margin">Title: <input id="title" type="text" name="title" placeholder='Name of pastry'
                        value={title}
                        onChange={updateTitle}
                        required/></div>
		        <textarea  className="textbox"
                        placeholder='Create your pastry recipe here...'
                        value={body}
                        onChange={updateBody}
                        required id="text" name="text" rows="4" />
		        <br/>
                <button type='submit' className="save" onSubmit={handleSubmit}>Save</button>

	            </form></div>
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
