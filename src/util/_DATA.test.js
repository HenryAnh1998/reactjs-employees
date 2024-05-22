const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");
describe("_saveQuestionAnswer", () => {
    it("Should return true with correct User", async () => {
        const response = await _saveQuestionAnswer({
            authedEmployee: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("Should return error with invalid User", async () => {
        const response = await _saveQuestionAnswer({
            authedEmployee: "sarahedo",
            qid: undefined,
            answer: "optionTwo"
        }).catch(e => e);

        expect(response).toBe("Please provide authedEmployee, qid, and answer");
    });
});

describe("_saveQuestion", () => {
    it("Should return formated question with correct author", async () => {
        setTimeout(async () => {
            const response = await _saveQuestion({
                optionOneText: 'option one test',
                optionTwoText: 'option two test',
                author: {
                    id: 'sarahedo'
                }
            })

            expect(response.author).toBe('sarahedo')
            expect(response.optionOne.text).toBe('option one test')
            expect(response.optionTwo.text).toBe('option two test')
            expect(response.id).toBeDefined();
            expect(response.timestamp).toBeDefined();
        }, 1000)
    });

    it("Should return error with invalid User", async () => {
        const response = await _saveQuestion({
            optionOneText: 'option one test',
            optionTwoText: 'option two test',
            author: undefined
        }).catch(e => e);

        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    });
});