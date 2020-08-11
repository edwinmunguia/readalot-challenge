import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Posts from "./views/Posts";
import Post from "./views/Post";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <Posts />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/post/:id/:slug" exact>
            <Post />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
