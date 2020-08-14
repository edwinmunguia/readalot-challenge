import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainLayout from "./views/MainLayout";
import Posts from "./views/Posts";
import Post from "./views/Post";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import NewPost from "./views/NewPost";
import EditPost from "./views/EditPost";
import Profile from "./views/Profile";
import { AuthContext } from "./contexts/AuthContext";

const AppRoutes = () => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <Posts />
          </Route>
          <Route path="/login">
            {loggedInUser.isLoggedIn && <Redirect to="/" />}
            <LogIn />
          </Route>
          <Route path="/signup">
            {loggedInUser.isLoggedIn && <Redirect to="/" />}
            <SignUp />
          </Route>
          <Route path="/post/:id/:slug" exact>
            <Post />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/posts/new" exact>
            {loggedInUser.isLoggedIn !== true && <Redirect to="/login" />}
            <NewPost />
          </Route>
          <Route path="/posts/edit/:id">
            {!loggedInUser.isLoggedIn && <Redirect to="/login" />}
            <EditPost />
          </Route>
          <Route path="/posts/:type/:value" exact>
            {loggedInUser.isLoggedIn !== true && <Redirect to="/login" />}
            <NewPost />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
