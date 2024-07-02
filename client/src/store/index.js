import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import statement
import { authReducer } from './reducer';
const store = createStore(authReducer, applyMiddleware(thunk));
export default store;
