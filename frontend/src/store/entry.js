import { csrfFetch } from "./csrf";

const ADD_ENTRY = '/entry/new';
const REMOVE_ENTRY = '/entry/del';
const GET_ENTRIES = '/entries';

const newEntry = (entry) => {
    return {
        type: ADD_ENTRY,
        entry
    }
};

const allEntries = (entries) => {
    return {
        type: GET_ENTRIES,
        entries
    }
}

const remove = (entryId) => {
    return {
        type: REMOVE_ENTRY,
        entryId
    }
};

export const createEntry = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/entries/new`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const entry = await response.json();
        dispatch(newEntry(entry));
        return entry;
    }
};

export const getOneEntry = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/entries/${id}`);

    if (response.ok) {
        const entry = await response.json();
        dispatch(newEntry(entry));
        return entry;
    }
}

export const getAllEntries = () => async (dispatch) => {
    const response = await csrfFetch('/api/entries');

    if (response.ok) {
        const entries = await response.json();
        dispatch(allEntries(entries));
        return entries;
    }
}

export const updateEntry = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/entries/${data.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const entry = await response.json();
        dispatch(newEntry(entry));
        return entry;
    }
};

export const deleteEntry = entryId => async dispatch => {
    const response = await csrfFetch(`/api/entries/${entryId}`, { method: 'delete', });

    if (response.ok) {
        await response.json()
        await dispatch(remove(entryId))
    }
};

const entryReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD_ENTRY:
            if (state && action.entry && !state[action.entry.id]) {
                newState = {
                    [action.entry.id]: action.entry
                };
            } else {
                newState = { ...state }
            }
            return newState;
        case REMOVE_ENTRY:
            newState = { ...state };
            delete newState[action.entryId];
            return newState;
        case GET_ENTRIES:
            const newEntries = {};
            newState = { ...state };
            action.entries.forEach(entry => {
                if (entry.id) {
                    newEntries[entry.id] = entry;
                }
            });
            return {
                ...newState,
                ...newEntries
            };
        default:
            return state;
    }
};

export default entryReducer;
