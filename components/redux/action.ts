import { UPDATE_URL } from "./constants";

export type ActionType = {
    type: string,
    data: string,
}

export function updateUrl(url: string): ActionType {

    return {
        type: UPDATE_URL,
        data: url
    }

}