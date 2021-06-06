import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";
import rootReducer from './reducers/index';

export default function configureStore(initialState={}) {
 return createStore(
   rootReducer,
   initialState,
   applyMiddleware(ReduxThunk)
 );
}