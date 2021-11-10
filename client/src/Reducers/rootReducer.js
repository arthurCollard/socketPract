import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import loginReducer from "./loginReducer";
import totalReducer from "./totalReducer";

export default combineReducers({
    contacts: contactReducer,
    login: loginReducer,
    total: totalReducer
})
