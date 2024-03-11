import { ActionType } from "./action";
import { UPDATE_URL } from "./constants";

const defaultUrl = "http://192.168.3.2:5000";

export const urlReducer = (state = defaultUrl, action: ActionType) => {
    switch (action.type) {
        case UPDATE_URL:
            return action.data
        default:
            return state
    }

}