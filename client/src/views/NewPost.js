import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import PostForm from "../components/PostForm";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";

const PostHandler = ({ mode, hasToLoad }) => {
  const history = useHistory();
  const { loggedInUser } = useContext(AuthContext);
  const [state, setState] = useState({
    isProcessing: false,
    errorOnPosting: null,
  });

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
      <div className="col-8 card shadow py-3">
        <h2 className="mb-3">Add new article</h2>
        {state.errorOnPosting && (
          <div className="alert alert-danger" role="alert">
            {state.errorOnPosting}
          </div>
        )}
        <PostForm
          isProcessing={state.isProcessing}
          onSubmit={handlePostSubmit}
        />
      </div>
    </div>
  );
};

export default PostHandler;
