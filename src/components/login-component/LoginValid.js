import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const LoginValid = ({ children, loggedIn }) => {
  const redirectUrl = window.location.href.toString().split(window.location.host)[1]
  return loggedIn ? children : <Navigate to={'/login?redirectTo=' + redirectUrl} />
}

const mapStateToProps = ({ authedEmployee }) => ({
  loggedIn: !!authedEmployee
})

export default connect(mapStateToProps)(LoginValid)
