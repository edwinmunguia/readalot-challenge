import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../components/PostForm";
import Loading from "../components/Loading";
import Message from "../components/Message";

const PostHandler = ({ mode, post, hasToLoad }) => {
  const { id } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: hasToLoad,
    post: {},
    postExist: false,
    errorMessage: "",
    isProcessing: false,
  });

  useEffect(() => {
    if (mode === "edit") {
      (async () => {
        const response = await axios.get(`/api/posts/${id}`);
        const data = await response.data;
        if (!data.error) {
          setState({ ...state, isLoading: false, post: data, postExist: true });
        } else {
          setState({
            ...state,
            isLoading: false,
            post: null,
            postExist: false,
            errorMessage: data.error,
          });
        }
      })();
    }
  }, []);

  const handlePostSubmit = async (data) => {
    setState({ ...state, isProcessing: true });
    const response = await axios.post("/api/posts", formData);
    const data = await response.data;

    if (!data.error) {

      setIsProcessing(false);
      history.push("/");
    } else {
      setErrorFromServer(data.error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="row post justify-content-center">
      {state.isLoading ? (
        <Loading message="Preparing to edit post, wait..." />
      ) : mode === "new" || state.postExist ? (
        <div className="col-8 card shadow-sm py-3">
          <h2 className="mb-3">
            {mode === "new" ? "Add new post" : "Edit post"}
          </h2>
          <PostForm
            initialData={mode === "edit" ? post : {}}
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

export default PostHandler;
