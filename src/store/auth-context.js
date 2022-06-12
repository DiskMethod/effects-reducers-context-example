import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logout: () => {},
  login: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storageValue = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storageValue === "true" ? true : false);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutHandler, loginHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
