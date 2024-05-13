import { ActionType } from "./action"
import { UPDATE_INTERVAL } from "./constants"

const initialInterval = 500

export const intervalReducer = (state = initialInterval, action: ActionType) => {

    switch (action.type) {
        case UPDATE_INTERVAL:
            return action.data
        default:
            return state
    }

}