import React, { useEffect, useReducer, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

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
  const emailRef = useRef();
  const passwordRef = useRef();

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
    dispatchLogin({ type: "SET_PASSWORD", password: e.target.value });
  };

  const blurHandler = () => {
    dispatchLogin({ type: "BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (login.formValid) {
      props.onLogin(login.email, login.password);
    } else if (!login.emailValid) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          className={`${classes.control} ${
            login.emailValid === false ? classes.invalid : ""
          }`}
          type="email"
          id="email"
          label="E-Mail"
          value={login.email}
          onChange={emailChangeHandler}
          onBlur={blurHandler}
        />
        <Input
          ref={passwordRef}
          className={`${classes.control} ${
            login.passwordValid === false ? classes.invalid : ""
          }`}
          type="password"
          id="password"
          label="Password"
          value={login.password}
          onChange={passwordChangeHandler}
          onBlur={blurHandler}
        />
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            // disabled={!login.formValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
