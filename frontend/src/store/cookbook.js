import { csrfFetch } from './csrf';

const ADD_COOKBOOKS = '/cookbooks/new';
const GET_COOKBOOKS = '/cookbooks';
const REMOVE_COOKBOOKS = '/cookbooks/del';

const newCookbook = cookbook => {
    return {
        type: ADD_COOKBOOKS,
        cookbook
    }
};

const allCookbooks = cookbooks => {
    return {
        type: GET_COOKBOOKS,
        cookbooks
    }
};

const delcookBook = cookbookId => {
    return {
        type: REMOVE_COOKBOOKS,
        cookbookId
    }
};

export const findOneCookBook = cookBookId => async dispatch => {
    const response = await csrfFetch(`/api/cookbooks/${cookBookId}`);
    if (response.ok) {
        const cookbook = await response.json();
        dispatch(newCookbook(cookbook));
        return cookbook;
    }
}

export const createCookbook = data => async dispatch => {
    const response = await csrfFetch('/api/cookbooks/new', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const cookbook = await response.json();
        dispatch(newCookbook(cookbook));
        return cookbook;
    };
};

export const getAllCookbooks = () => async dispatch => {
    const response = await csrfFetch('/api/cookbooks');
    if (response.ok) {
        const cookbooks = await response.json();
        dispatch(allCookbooks(cookbooks));
        return cookbooks;
    }
};

export const updateCookbook= data => async dispatch => {
    const response = await csrfFetch(`/api/cookBook/${data.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const cookbook = await response.json();
        dispatch(newCookbook(cookbook));
        return cookbook;
    };
};

export const deleteCookbook = cookbookId => async dispatch => {
    const response = await csrfFetch(`/api/cookbooks/${cookbookId}`, { method: 'delete' });

    if (response.ok) {
        await response.json();
        await dispatch(delcookBook(cookbookId));
    };
};

const cookbookReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_COOKBOOKS:
            if (!state[action.cookbook.id]) {
                newState = {
                    [action.cookbook.id]: action.cookbook
                };
            }
            return newState;
        case REMOVE_COOKBOOKS:
            delete newState[action.cookbookId];
            return newState;
        case GET_COOKBOOKS:
            const newCookbook = {};
            action.cookbooks.forEach(cookbook => {
                if (cookbook.id) {
                    newCookbook[cookbook.id] = cookbook
                };
            });
            return {
                ...newState,
                ...newCookbook
            };
        default:
            return state;
    }
};

export default cookbookReducer;
