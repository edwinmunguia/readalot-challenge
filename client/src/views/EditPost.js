import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../components/PostForm";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";

const EditPost = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loggedInUser } = useContext(AuthContext);

  const [state, setState] = useState({
    isLoading: true,
    post: null,
    postExist: false,
    errorMessage: "",
    isProcessing: false,
    errorOnUpdatingMessage: null,
  });

  //Try to load the post
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/posts/${id}`);

      const data = await response.data;

      if (!data.error) {
        setState({ ...state, isLoading: false, post: data, postExist: true });
      } else {
        setState({
          ...state,
          isLoading: false,
          postExist: false,
          errorMessage: data.error,
        });
      }
    })();
  }, []);

  const handlePostSubmit = async (formData) => {
    setState({ ...state, isProcessing: true });
    console.log(formData)
    const response = await axios.patch(`/api/posts/${id}`, formData, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": loggedInUser.token,
      },
    });
    console.log(response);
    const data = await response.data;

    if (!data.error) {
      history.push(`/post/${data.id}/${data.slug}`);
      setState({ ...state, isProcessing: false });
    } else {
      setState({
        ...state,
        isProcessing: false,
        errorOnUpdatingMessage: data.error,
      });
    }
  };

  return (
    <div className="row post justify-content-center">
      {state.isLoading ? (
        <Loading message="Preparing to edit post, wait..." />
      ) : state.postExist ? (
        <div className="col-8 card shadow py-3">
          <h2 className="mb-3">Edit article</h2>
          {state.errorOnUpdatingMessage && (
            <div className="alert alert-danger" role="alert">
              {state.errorOnUpdatingMessage}
            </div>
          )}
          <PostForm
            initialData={state.post}
            isProcessing={state.isProcessing}
            onSubmit={handlePostSubmit}
          />
        </div>
      ) : (
        <Message title="Error!" message={state.errorMessage} type="error" />
      )}
    </div>
  );
};

export default EditPost;
