export const LOGIN_AUTHENTICATED_USER = "LOGIN_AUTHENTICATED_USER";
export const LOGOUT_AUTHENTICATED_USER = "LOGOUT_AUTHENTICATED_USER";

export function loginAuthenticatedUser(authedEmployee) {
    return {
        type: LOGIN_AUTHENTICATED_USER,
        authedEmployee
    };
}

export function logoutauthedEmployee() {
    return {
        type: LOGOUT_AUTHENTICATED_USER,
    };
}

export function handleLogin(username, password) {
    return (dispatch, getState) => {
        const { users } = getState();
        const user = Object.values(users).find((user) => user.id === username && user.password === password);

        if (!!user) {
            return dispatch(loginAuthenticatedUser(user));
        }
    };
}

export function handleLogout() {
    return (dispatch) => {
        return dispatch(logoutauthedEmployee());
    };
}
