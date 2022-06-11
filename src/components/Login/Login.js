import React, { useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_PASSWORD":
      return { ...state, password: action.password };
    case "BLUR":
      return {
        ...state,
        emailValid: state.email.length && state.email.includes("@"),
        passwordValid:
          state.password.length && state.password.trim().length > 6,
      };
    case "VALIDATE":
      return { ...state, formValid: state.emailValid && state.passwordValid };
    default:
      console.log("Should not get here!");
  }
};

const init = {
  password: "",
  email: "",
  passwordValid: null,
  emailValid: null,
  formValid: false,
};

const Login = (props) => {
  const [login, dispatchLogin] = useReducer(loginReducer, init);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatchLogin({ type: "VALIDATE" });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [login.passwordValid, login.emailValid]);

  const emailChangeHandler = (e) => {
    dispatchLogin({ type: "SET_EMAIL", email: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    console.log("password changing");
    dispatchLogin({ type: "SET_PASSWORD", password: e.target.value });
  };

  const blurHandler = () => {
    dispatchLogin({ type: "BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(login.email, login.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            login.emailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={login.email}
            onChange={emailChangeHandler}
            onBlur={blurHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            login.passwordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={login.password}
            onChange={passwordChangeHandler}
            onBlur={blurHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!login.formValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
