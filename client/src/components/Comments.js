import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { CommentsContext } from "../contexts/CommentsContext";

const Comments = ({ data }) => {
  const { loggedInUser } = useContext(AuthContext);
  const { removeComment } = useContext(CommentsContext);
  const { id } = useParams();

  const handleDeleteComment = (commentId) => {
    const deleteCommentFromServer = () => {
      axios
        .delete(`/api/comments/${commentId}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": loggedInUser.token,
          },
        })
        .then((result) => {
          const data = result.data;
          if (!data.error) {
            removeComment(commentId);
          } else {
            alert(data.error);
          }
        })
        .catch((err) => {});
    };

    confirmAlert({
      title: "Delete comment?",
      message: "Are you sure you want to delete this comment?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCommentFromServer(),
        },
        {
          label: "Cancel",
          onClick: () => null,
        },
      ],
    });
  };
  return (
    <div className="comments row justify-content-center">
      <div className="col-11 col-md-7">
        <h3>Post's comments</h3>
        {loggedInUser.isLoggedIn ? (
          <CommentForm
            post={id}
            user={loggedInUser}
          />
        ) : (
          <div className="login-to-comment">
            You must log in to comment this post.
          </div>
        )}
        {data.length > 0 ? (
          <div className="comments-list py-4">
            {data.map((comment) => (
              <Comment
                key={comment.id}
                data={comment}
                onDeletePress={handleDeleteComment}
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

export default Comments;
