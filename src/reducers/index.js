import { combineReducers } from "redux";
import loginReducer from "./loginReducer";



const rootReducers = combineReducers({
  loginReducer,
});

export default rootReducers;
