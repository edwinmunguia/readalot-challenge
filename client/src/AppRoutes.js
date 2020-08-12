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
import PostHandler from "./views/PostHandler";
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
          <Route path="/posts/new" exact>
            {loggedInUser.isLoggedIn !==true && <Redirect to="/login" />}
            <PostHandler mode="new" hasToLoad={false} />
          </Route>
          <Route path="/posts/edit/:id">
            {!loggedInUser.isLoggedIn && <Redirect to="/login" />}
            <PostHandler mode="edit" hasToLoad={true} />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
