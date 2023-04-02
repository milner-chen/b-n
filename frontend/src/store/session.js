import csrfFetch from "./csrf";

// ACTIONS
// nest under the name of the slice
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// ACTION CREATORS

const setUser = (user) => {
    return ({
        type: SET_USER,
        user
    })
}

const removeUser = () => {
    return ({
        type: REMOVE_USER
    })
}

// THUNK ACTION CREATORS

export const signup = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    if (data.user) dispatch(setUser(data.user));
    return res;
}

export const login = (user) => async (dispatch) => {
    // request to backend
    const res = await csrfFetch('/api/session', {
        // headers taken care of in csrfFetch
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await res.json();
    // update frontend
    dispatch(setUser(data));
    // for error handling?
    return res;
}


export const restoreSession = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');
    // console.log(res);
    storeCSRFToken(res);
    const data = await res.json();
    // console.log(data);
    storeCurrentUser(data.user);
    dispatch(setUser(data.user));
    return res;
}

// restore session helper methods

const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        // sessionStorage.getItem('currentUser');
        sessionStorage.removeItem('currentUser');
    }
}

export const storeCSRFToken = (res) => {
    // cannot access like a normal js object with []
    // use method .get()
    const token = res.headers.get('X-CSRF-Token');
    if (token) {
        sessionStorage.setItem('X-CSRF-Token', token);
    }
}


// initial state
const initialState = { user: JSON.parse(sessionStorage.getItem('currentUser')) };

// SESSION REDUCER

const sessionReducer = (state=initialState, action) => {
    Object.freeze(state);
    switch(action.type) {
        case SET_USER:
            // set key of user to user from backend
            return { ...state, user: action.user };
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
};

export default sessionReducer;