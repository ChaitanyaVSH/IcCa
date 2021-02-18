const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const thunkMiddleWare = require("redux-thunk").default;

const axios = require("axios");


// Create states
// Create Actions, Action Creators that returns the Actions


// Initial State
const initialState = {
    laoding: false,
    users: [],
    error: ""
}

// Action type Strings
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST"
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE"

// Action Creators
const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
        description: "Fetching the users from the API"
    }
}

const fetchUsersSucess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        description: "Users fetched successfully",
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        description: "Users fetching failed",
        payload: error
    }
}


// Reducers
const reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ""
            }

        case FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }

        default:
            return state
    }
}

// Defining Async Action Creator
const fetchUsers = () => {

    // This Action creator can do the side effects instead of just returning the Actions as above
    // It can also dispatch actions as it recieves the dispatch as the arguement
    return function(dispatch) {

        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                // response.data is the users
                const users = response.data.map(user => user.id)
                dispatch(fetchUsersSucess(users))
            })
            .catch(error => {
                // error.message is the error message
                const errorMessage = error.message;
                dispatch(fetchUsersFailure(errorMessage))
            })

    }
}

// Creating || Configuring the store
const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
const unsubscribe = store.subscribe(() => {console.log(store.getState())})

// Dispatching the Async Action Creators
store.dispatch(fetchUsers());