import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Posts from "./views/Posts";
import Post from "./views/Post";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
