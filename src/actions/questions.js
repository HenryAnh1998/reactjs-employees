import { saveQuestion, saveQuestionAnswer } from "../util/api";
import { addAnswerUser, addAskingUser } from "./employee";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";
export const GET_QUESTIONS = "GET_QUESTIONS";

export function receiveQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions,
    };
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

function addAnswerQuestion(author, qid, answer) {
    return {
        type: ADD_ANSWER,
        author,
        qid,
        answer,
    };
}

export function handleAddQuestion(firstOption, secondOption) {
    return (dispatch, getState) => {
        const { authedEmployee } = getState();

        return saveQuestion(firstOption, secondOption, authedEmployee)
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(addAskingUser(question))
            })
    };
}

export function handleAddAnswer(questionId, answer) {
    return (dispatch, getState) => {
        const { authedEmployee } = getState();
        return saveQuestionAnswer(authedEmployee.id, questionId, answer)
            .then(() => {
                dispatch(addAnswerQuestion(authedEmployee.id, questionId, answer));
                dispatch(addAnswerUser(authedEmployee.id, questionId, answer));
            });
    };
}
