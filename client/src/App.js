import React, { useState, useEffect, useReducer, useMemo } from "react";
import "bootstrap/dist/js/bootstrap.esm";
import { AuthContext } from "./contexts/AuthContext";
import { CommentsContext } from "./contexts/CommentsContext";
import { initialAuthReducer, authReducer } from "./reducers/authreducer";
import {
  initialCommentsReducer,
  commentsReducer,
} from "./reducers/commentsreducer";
import { authStorage } from "./utils/authstorage";
import AppRoutes from "./AppRoutes";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthReducer);
  const [commentsState, commentsDispatch] = useReducer(
    commentsReducer,
    initialCommentsReducer
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const authContext = useMemo(() => ({
    loggedInUser: authState,
    logInUser: (user, token) => {
      authDispatch({ type: "LOGIN", user, token });
    },
    logOutUser: () => authDispatch({ type: "LOGOUT" }),
  }));

  const commentsContext = useMemo(() => ({
    commentsList: commentsState,
    addCommentsList: (list) => commentsDispatch({type: "ADD_LIST", comments: list}),
    addComment: (comment) => commentsDispatch({type: "ADD_COMMENT", comment}),
    removeComment: (comment) => commentsDispatch({type: "REMOVE_COMMENT", comment}),
  }));

  useEffect(() => {
    document.title = "Read a Lot: Good reads everyday!";
    //Verify user session in local storage
    const authenticatedUser = authStorage.get();
    if (authenticatedUser) {
      const { user, token } = authenticatedUser;
      authContext.logInUser(user, token);
    }
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <AuthContext.Provider value={authContext}>
          <CommentsContext.Provider value={commentsContext}>
            <div className="app">
              <AppRoutes />
            </div>
          </CommentsContext.Provider>
        </AuthContext.Provider>
      )}
    </>
  );
}

export default App;
