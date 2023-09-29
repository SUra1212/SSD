import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
const initialState = {};
const middleware = [thunk];//return functions
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware), //extend Redux with custom functionality
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()(
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      )) ||
      compose
  )
);
export default store;
