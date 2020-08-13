import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../components/PostForm";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";

const PostHandler = ({ mode, hasToLoad }) => {
  const { id } = useParams();
  const history = useHistory();
  const { loggedInUser } = useContext(AuthContext);
  const [state, setState] = useState({
    isLoading: hasToLoad,
    post: {},
    postExist: false,
    ostExistErrorMessage: "",
    isProcessing: false,
    errorOnPosting: null,
  });

  //Try to load the post if in edit mode
  useEffect(() => {
    if (mode === "edit") {
      (async () => {
        const response = await axios.get(`/api/posts/${id}`);
        const data = await response.data;
        console.log(data);
        if (!data.error) {
          setState({ ...state, isLoading: false, post: data, postExist: true });
        } else {
          setState({
            ...state,
            isLoading: false,
            post: null,
            postExist: false,
            postExistErrorMessage: data.error,
          });
        }
      })();
    }
  }, []);

  const handlePostSubmit = async (formData) => {
    setState({ ...state, isProcessing: true });
    const response = await axios.post("/api/posts", formData, {
      headers: { "auth-token": loggedInUser.token },
    });
    const data = await response.data;

    if (!data.error) {
      history.push(`/post/${data.id}/${data.slug}`);
      setState({ ...state, isProcessing: false });
    } else {
      setState({ ...state, isProcessing: false, errorOnPosting: data.error });
    }
  };

  return (
    <div className="row post justify-content-center">
      {state.isLoading ? (
        <Loading message="Preparing to edit post, wait..." />
      ) : mode === "new" || state.postExist ? (
        <div className="col-8 card shadow py-3">
          <h2 className="mb-3">
            {mode === "new" ? "Add new post" : "Edit post"}
          </h2>
          {state.errorOnPosting && (
            <div className="alert alert-danger" role="alert">
              {state.errorOnPosting}
            </div>
          )}
          <PostForm
            initialData={
              mode === "edit"
                ? state.post
                : { title: "", content: "", categories: "" }
            }
            isProcessing={state.isProcessing}
            onSubmit={handlePostSubmit}
          />
        </div>
      ) : (
        <Message
          title="Error!"
          message={state.postExisteErrorMessage}
          type="error"
        />
      )}
    </div>
  );
};

export default PostHandler;
