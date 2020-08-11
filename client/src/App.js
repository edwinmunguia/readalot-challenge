import React, { useReducer } from "react";
import "bootstrap/dist/js/bootstrap.esm";
import { AuthContext } from "./contexts/AuthContext";
import { initialAuthReducer, authReducer } from "./reducers/authreducer";
import AppRoutes from "./AppRoutes";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthReducer);
  const authContext = {
    loggedInUser: authState.user,
    logInUser: (user, token) => authDispatch({ type: "LOGIN", user, token }),
    logOutUser: () => authDispatch({ type: "LOGOUT" }),
  };

  return (
    <AuthContext.Provider value={authContext}>
      <div className="app">
        <AppRoutes />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
