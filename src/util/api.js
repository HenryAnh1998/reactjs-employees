import {_getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer} from "./_DATA";

export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

export function saveQuestion(optionOneText, optionTwoText, author) {
    return _saveQuestion({optionOneText, optionTwoText, author});
}

export function saveQuestionAnswer(authedEmployeeId, qid, answer) {
    return _saveQuestionAnswer({
        authedEmployee: authedEmployeeId,
        qid,
        answer
    });
}
