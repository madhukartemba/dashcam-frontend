import { combineReducers } from "redux";
import { urlReducer } from "./urlReducer";
import { intervalReducer } from "./intervalReducer";


export default combineReducers({
    urlReducer,
    intervalReducer
})