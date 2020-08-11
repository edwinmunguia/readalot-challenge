import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { initialAuthReducer, authReducer } from "./reducers/authreducer";
import MainLayout from "./views/MainLayout";
import Posts from "./views/Posts";
import Post from "./views/Post";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import "./App.css";

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthReducer);
  const authContext = {
    loggedInUser: authState.user,
    logInUser: (user) => authDispatch({ type: "LOGIN", user }),
    logOutUser: () => authDispatch({ type: "LOGOUT"}),
  };

  return (
    <AuthContext.Provider value={authDispatch}>
      <MainLayout>
        <Router>
          <Switch>
            <Route path="/" component={Posts} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/post/:permalink" component={Post} />
          </Switch>
        </Router>
      </MainLayout>
    </AuthContext.Provider>
  );
}

export default App;
