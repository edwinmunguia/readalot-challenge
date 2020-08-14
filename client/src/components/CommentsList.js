import React, { useEffect, useState, useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import { AuthContext } from "../contexts/AuthContext";

const CommentsList = ({comments}) => {
    const { loggedInUser } = useContext(AuthContext);
  return (
    <div className="comments row justify-content-center">
      <div className="col-11 col-md-7">
        <h3>Post's comments</h3>
        {loggedInUser.isLoggedIn ? (
          <CommentForm
            post={id}
            user={loggedInUser}
            onAddComment={handleNewComment}
          />
        ) : (
          <div className="login-to-comment">
            You must log in to comment this post.
          </div>
        )}
        {comments.length > 0 ? (
          <div className="comments-list py-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                data={comment}
                onDeletePress={handleConfirmDeleteComment}
              />
            ))}
          </div>
        ) : (
          <div className="no-comments mt-4">No comments yet.</div>
        )}
      </div>
    </div>
  );
};

export default CommentsList;
