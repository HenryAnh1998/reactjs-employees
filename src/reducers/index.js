import { combineReducers } from "@reduxjs/toolkit";
import authedEmployee from "./authedEmployee";
import questions from "./questions";
import users from "./employee";

export default combineReducers({ authedEmployee, users, questions, });
