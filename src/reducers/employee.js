import { ADD_ANSWER_USER, ADD_ASKING_USER, RECEIVE_USERS } from "../actions/employee";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        case ADD_ANSWER_USER:
            return {
                ...state,
                [action.authedEmployee]: {
                    ...state[action.authedEmployee],
                    answers: {
                        ...state[action.authedEmployee].answers,
                        [action.qid]: action.answer
                    }
                }
            };
        case ADD_ASKING_USER:
            return {
                ...state,
                [action.author]: {
                    ...state[action.author],
                    questions: state[action.author].questions.concat(action.qid)
                }
            };
        default:
            return state;
    }
}
