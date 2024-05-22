import { connect } from "react-redux"
import { Link } from "react-router-dom"
import "./card.css";
const Card = ({authedEmployee, question, author, isVoted }) => {
    const isUserChoices1 = question.optionOne.votes.includes(authedEmployee.id)
    const isUserChoices2 = question.optionTwo.votes.includes(authedEmployee.id)
    const isUserChoices = isUserChoices1 || isUserChoices2
    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                let rs = question.optionOne.votes.length / numberVotesTotal * 100;
                if (rs) {
                    return rs.toFixed(1) + "%";
                } else {
                    return 0 + "%"
                }

            case "optionTwo":
                let rs2 = question.optionTwo.votes.length / numberVotesTotal * 100;
                if (rs2) {
                    return rs2.toFixed(1) + "%";
                } else {
                    return 0 + "%"
                }
            default:
                return ""
        }
    }

    return (
        <div className="card" style={{ textAlign: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            {
                isVoted ?
                    <div className="card-header bg-success text-white">
                        Voted: {question.optionOne.votes.length + question.optionTwo.votes.length}
                    </div>
                    :
                    <div className="card-header bg-info text-dark">
                        New Question
                    </div>
            }
            <img src={author?.avatarURL} style={{ height: '50px', width: '50px', marginTop: '10px', backgroundColor: 'grey' }} className="card-img-top" alt="Author" />
            <h5 className="card-title">{question.author}</h5>
            <div className="row card-body">
                <div style={{ height: 150 }}>
                    <div style={{ height: 120, display: "flex", justifyContent: 'space-between' }}>
                        <div className={isUserChoices && isUserChoices1? "col-6 choice": "col-6"}>
                            <div style={{ height: 80 }}>
                                <p className="font-bold mb-2">{question.optionOne.text}</p>
                            </div>
                            <p style={{ margin: '0px', color: 'red' }}>Votes: {question.optionOne.votes.length} ({calcPercentage("optionOne", question)})</p>
                        </div>
                        <div className={isUserChoices && isUserChoices2 ? "col-6 choice": "col-6"}>
                            <div style={{ height: 80 }}>
                                <p className="font-bold mb-2">{question.optionTwo.text}</p>
                            </div>
                            <p style={{ margin: '0px', color: 'red' }}>Votes: {question.optionTwo.votes.length} ({calcPercentage("optionTwo", question)})</p>
                        </div>
                    </div>
                    <p className="fw-light">{new Date(question.timestamp).toDateString()}</p>
                    
                </div>
                <Link to={'questions/' + question.id}>
                    {
                        isVoted ?
                            <button className="btn btn-primary">Show</button>
                            :
                            <button className="btn btn-primary">Vote</button>
                    }
                </Link>
            </div>
        </div>

    );
}
const mapStateToProps = ({ authedEmployee, users }) => ({
    authedEmployee,
    users,
});

export default connect(mapStateToProps)(Card)
