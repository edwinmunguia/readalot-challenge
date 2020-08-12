import React, { useState, useEffect, useReducer } from "react";
import "bootstrap/dist/js/bootstrap.esm";
import { AuthContext } from "./contexts/AuthContext";
import { initialAuthReducer, authReducer } from "./reducers/authreducer";
import { authStorage } from "./utils/authstorage";
import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthReducer);
  const [isLoaded, setIsLoaded] = useState(false);
  const authContext = {
    loggedInUser: authState,
    logInUser: (user, token) => {
      authDispatch({ type: "LOGIN", user, token });
    },
    logOutUser: () => authDispatch({ type: "LOGOUT" }),
  };

  useEffect(() => {
    //Verify user session in local storage
    const authenticatedUser = authStorage.get();
    if (authenticatedUser) {
      const { user, token } = authenticatedUser;
      authContext.logInUser(user, token);
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      {isLoaded && (
        <AuthContext.Provider value={authContext}>
          <div className="app">
            <AppRoutes />
          </div>
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
