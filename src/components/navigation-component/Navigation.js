import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../actions/authedEmployee";

const Navigation = ({ dispatch, authedEmployeeId, users }) => {

    const logout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
    };
    const imageURL = users[authedEmployeeId]?.avatarURL;

    return (

        <div className="container">
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div className="col-12 col-md-8">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/leaderboard" className="nav-link" >Leaderboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/new" className="nav-link">New Poll</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md-4" style={{ display: 'flex', justifyContent: 'end' }}>
                    <span className="nav nav-tabs" data-testid="user-information" style={{ alignItems: 'center' }}>
                        <img src={imageURL} className="rounded" style={{ width: '30px', height: '30px', marginRight: '5px', backgroundColor: 'grey', fontWeight: 'bold'}} alt={authedEmployeeId} />
                        <p style={{fontWeight: "bold", color: 'rebeccapurple', margin:0}}>{authedEmployeeId}</p>
                        <a onClick={logout} className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Logout</a>
                    </span>
                </div>
            </div>
        </div>

    );
};

const mapStateToProps = ({ authedEmployee, users }) => ({
    authedEmployeeId: authedEmployee.id,
    users
});


export default connect(mapStateToProps)(Navigation);
