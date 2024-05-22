import { LOGOUT_AUTHENTICATED_USER, LOGIN_AUTHENTICATED_USER } from "../actions/authedEmployee";

export default function authedEmployee(state = null, action) {
    switch (action.type) {
        case LOGIN_AUTHENTICATED_USER:
            return action.authedEmployee;
        case LOGOUT_AUTHENTICATED_USER:
            sessionStorage.removeItem('user')
            return null;
        default:
            return state
    }
}
