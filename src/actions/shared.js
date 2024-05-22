import { getEmployees } from "./employee";
import { receiveQuestions } from "./questions";
import { getInitialData } from "../util/api";

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData().then(({ users, questions }) => {
            dispatch(getEmployees(users));
            dispatch(receiveQuestions(questions));
        });
    };
}
