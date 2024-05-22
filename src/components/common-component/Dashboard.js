import { connect } from "react-redux";
import Card from "./Card";
import { useState } from "react";
const Dashboard = ({ authedEmployee, questions, users }) => {
    const isNew = (question) => (!question.optionOne.votes.includes(authedEmployee.id) && !question.optionTwo.votes.includes(authedEmployee.id))
    const voted = (question) => (question.optionOne.votes.includes(authedEmployee.id) || question.optionTwo.votes.includes(authedEmployee.id))
    const  [switchState, setSwitchState] = useState(1);
    const switchTab = (index) => {
        setSwitchState(index);
    }
     
    return (
        <div className="container" data-testid="dashboard">
            <div className="bloc-tabs">
                <button onClick={() => (switchTab(1))} className={switchState === 1 ? "btn btn-primary" : "btn"}>Unanswered </button>
                <button onClick={() => (switchTab(2))} className={switchState === 2 ? "btn btn-primary" : "btn"}>Answered </button>
            </div>
            <div className={switchState === 1 ? "content active-content" : "content"} style={{backgroundColor: 'whitesmoke', marginTop: 20}}>
                <div className="panel-heading center" style={{textAlign:'center', fontSize: 18, fontWeight: 'bold'}}>New Questions</div>
                <div className="row panel-body" >
                    <div className="col-12">
                        <ul className="row row-cols-3" style={{display: "flex",padding: 20, justifyContent: "center" }}>
                            {questions.filter(isNew).map((question) => (
                                <li key={question.id} className="col" style={{ paddingBottom: 'calc(var(--bs-gutter-x) * .5)', paddingTop: 'calc(var(--bs-gutter-x) * .5)' }}>
                                    <Card question={question} author={users[question.author]} isVoted={false} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={switchState === 2 ? "content active-content" : "content"} style={{backgroundColor: 'greenyellow', marginTop: 20}}>
            <div className="panel-heading center" style={{textAlign:'center', fontSize: 18, fontWeight: 'bold'}}>Done</div>
                <div className="row">
                    <div className="col-12">
                    <ul className="row row-cols-3" style={{display: "flex", padding: 20,justifyContent: "center" }}>
                            {questions.filter(voted).map((question) => (
                                <li key={question.id} className="col" style={{ paddingBottom: 'calc(var(--bs-gutter-x) * .5)', paddingTop: 'calc(var(--bs-gutter-x) * .5)' }}>
                                    <Card question={question} author={users[question.author]} isVoted={true} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ authedEmployee, questions, users }) => ({
    authedEmployee,
    questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
    users,
});

export default connect(mapStateToProps)(Dashboard);
