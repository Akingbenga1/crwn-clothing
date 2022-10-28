import {createAction} from "../../utils/reducer/reducer.util";
import {USER_ACTION_TYPES} from "../../contexts/user.context";


export const setCurrentUser  = (user) =>
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user )
