import React, { useEffect } from 'react';
import Navigation from "./components/navigation-component/Navigation";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/common-component/Dashboard";
import NewPoll from "./components/newpoll-component/NewPoll";
import PollPage from "./components/newpoll-component/PollPage";
import { connect } from "react-redux";
import Login from "./components/login-component/Login";
import { handleInitialData } from "./actions/shared";
import Leaderboard from "./components/common-component/Leaderboard";
import ErrorPage from "./components/common-component/ErrorPage";
import LoginValid from "./components/login-component/LoginValid";
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])

  return (
    <div className="container mx-auto py-4">
      {loggedIn && <Navigation />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<LoginValid><Dashboard /></LoginValid>} />
        <Route path="/leaderboard" exact element={<LoginValid><Leaderboard /></LoginValid>} />
        <Route path="/questions/:id" element={<LoginValid><PollPage /></LoginValid>} />
        <Route path="/new" exact element={<LoginValid><NewPoll /></LoginValid>} />
        <Route path="/404" exact element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedEmployee }) => ({
  loggedIn: !!authedEmployee,
});

export default connect(mapStateToProps)(App);