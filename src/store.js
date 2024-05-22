import { configureStore } from '@reduxjs/toolkit';
import authedEmployee from "./reducers/authedEmployee";
import users from "./reducers/employee";
import questions from "./reducers/questions";

export const store = configureStore({
    reducer: { authedEmployee, users, questions },
});