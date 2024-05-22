import { connect } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { handleAddAnswer } from '../../actions/questions'
import "../common-component/card.css";

const PollPage = ({ dispatch, authedEmployee, users, questions }) => {
    const navigate = useNavigate()

    const { id } = useParams()
    const question = Object.values(questions).find((question) => question.id === id);
    if (!authedEmployee || !question) {
        return <Navigate to="/404" />;        
    }
    const author = Object.values(users).find((user) => user.id === question.author);

    const isVotedForOptionOne = question.optionOne.votes.includes(authedEmployee.id)
    const isVotedForOptionTwo = question.optionTwo.votes.includes(authedEmployee.id)
    const isVoted = isVotedForOptionOne || isVotedForOptionTwo

    const handleOptionOne = (e) => {
        e.preventDefault()
        dispatch(handleAddAnswer(question.id, 'optionOne'))
        navigate('/questions/'+question.id)  
    }

    const handleOptionTwo = (e) => {
        e.preventDefault()
        dispatch(handleAddAnswer(question.id, 'optionTwo'))
        navigate('/questions/'+question.id)        
    }

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length
        switch (option) {
            case 'optionOne':
                return (question.optionOne.votes.length / numberVotesTotal * 100).toFixed(1) + ' %'
            case 'optionTwo':
                return (question.optionTwo.votes.length / numberVotesTotal * 100).toFixed(1) + ' %'
            default:
                return ''
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="d-flex flex-column" style={{ textAlign: 'center' }}>
                    <div className="p-2">
                        <h4>Poll by {author.id}</h4>
                    </div>
                    <div className="p-2">
                        <img src={author?.avatarURL} style={{ height: '50px', width: '50px', marginTop: '10px' }} className="card-img-top" alt="Profile" />
                    </div>
                </div>
            </div>
            <div className="row">
                <h1 className="text-center">Would You Rather</h1>
            </div>
            <div className="row text-center">
                <div className="col-6">
                    <div className="card text-center">
                        <div className={isVoted && isVotedForOptionOne ? "choice":""} style={{height: 130}}>
                            <p className="font-bold mb-2">{question.optionOne.text}</p>
                            <p>{isVoted && isVotedForOptionOne? "Note: This is my vote": ""} </p>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-1">
                                <button onClick={handleOptionOne} disabled={isVoted} className="btn btn-primary">
                                    {!isVoted &&
                                        <p style={{ margin: '0px' }}>Click</p>
                                    }
                                    {isVoted &&
                                        <p style={{ margin: '0px' }}>Votes: {question.optionOne.votes.length} ({calcPercentage('optionOne', question)})</p>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card text-center">
                    <div className={isVoted && isVotedForOptionTwo ? "choice":""} style={{height: 130}}>
                            <p className="font-bold mb-2">{question.optionTwo.text}</p>
                            <p>{isVoted && isVotedForOptionTwo ? "Note: This is my vote": ""} </p>
                        </div>
                        <div className="card-body">
                            <div className="d-grid gap-1">
                                <button className="btn btn-primary" onClick={handleOptionTwo} disabled={isVoted}>
                                    {
                                        !isVoted && <p style={{ margin: '0px' }}>Click</p>
                                    }

                                    {
                                        isVoted && <p style={{ margin: '0px' }}>Votes: {question.optionTwo.votes.length} ({calcPercentage('optionTwo', question)})</p>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedEmployee, users, questions }) => {
    try {
        return { authedEmployee, users, questions }
    } catch (e) {
        return <Navigate to="/404" />;
    }
}

export default connect(mapStateToProps)(PollPage)
