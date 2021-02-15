const redux = require("redux");
const createStore = redux.createStore; 

// Redux Actions tutorial: https://www.youtube.com/watch?v=2lxCaLJ2Rbk&list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK&index=5


// Action types have to be the String constants
const BUY_CAKE = "BUY_CAKE"

// Defining the action that has the type property
// Action creator, simply returns an action. It's a function that returns the action
// With the help of Action Creators it will be easty to maintain the dispatch methods as they take actions as the parameter
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First redux action",
    }
}


// Reducer requires prevState and the action

// initial state
const initialState = {
    numberOfCakes: 10
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        // We are not mutating the state object, instead we are returning a new state object
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1,
            }
        
        // Default handler to pass the default state
        default:
            return state
    }

}

// Redux store is storing the initial state of the App. Responsibility 1
const store = createStore(reducer);

// Access the state using the getState() method. Responsibility 2
console.log("Initial State: ", store.getState());


// Recieve notifications using the subscriptions. Responsibilty 4
const unsubscribe = store.subscribe(() => console.log("Updated state: ", store.getState()));

// Responsibility 3
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe();