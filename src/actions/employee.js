export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const ADD_ASKING_USER = "ADD_ASKING_USER";

export function getEmployees(users) {
    return {
        type: RECEIVE_USERS,
        users
    };
}

export function addAnswerUser(authedEmployee, qid, answer) {
    return {
        type: ADD_ANSWER_USER,
        authedEmployee,
        qid,
        answer
    };
}

export function addAskingUser({ author, id }) {
    return {
        type: ADD_ASKING_USER,
        author,
        qid: id
    };
}
