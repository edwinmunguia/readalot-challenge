import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import { CommentsContext } from "../contexts/CommentsContext";

const CommentForm = ({ post, user, onAddComment }) => {
  const { addComment } = useContext(CommentsContext);
  const [state, setState] = useState({
    isProcessing: false,
    errorFromServer: null,
  });
  const comment = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (comment.current.value.trim().length > 0) {
      setState({
        ...state,
        isProcessing: true,
      });

      axios
        .post(
          `/api/comments`,
          {
            post: post,
            comment: comment.current.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": user.token,
            },
          }
        )
        .then((result) => {
          const data = result.data;
          if (!data.error) {
            //Send the new comment to the Context
            addComment(data);

            //Update the State
            setState({
              ...state,
              isProcessing: false,
              errorFromServer: null,
            });
          } else {
            setState({
              ...state,
              isProcessing: false,
              errorFromServer: data.error,
            });
          }
        })
        .catch((err) => {
          setState({
            ...state,
            isProcessing: false,
          });
        });
    } else {
      comment.current.focus();
    }
  };

  return (
    <form
      className="comment-form p-2 bg-light rounded"
      onSubmit={handleFormSubmit}
    >
      {state.errorFromServer && (
        <div className="alert alert-danger" role="alert">
          {state.errorFromServer}
        </div>
      )}
      <div className="mb-2">
        <textarea
          className="form-control"
          ref={comment}
          id="comment"
          name="comment"
          rows="3"
        />
      </div>
      <div>
        {!state.isProcessing ? (
          <button type="submit" className="btn btn-primary">
            Add comment
          </button>
        ) : (
          <div className="spinner-border text-success mb-3" role="status">
            <span className="sr-only">loading..</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
