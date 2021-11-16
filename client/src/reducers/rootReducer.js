import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import gameReducer from "./gameReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    login: loginReducer,
    game: gameReducer,
    messages: messageReducer
})
