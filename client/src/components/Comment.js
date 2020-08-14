import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const Comment = ({ data, onDeletePress }) => {
  const handleDelete = () => {
    const deleteComment = () => {
      axios
        .delete(`/api/comments/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": loggedInUser.token,
          },
        })
        .then((result) => {
          const data = result.data;
          if (!data.error) {
            const filteredList = state.comments.filter(
              (comment) => comment.id !== commentId
            );
            setState({ ...state, comments: filteredList });
          } else {
          }
        })
        .catch((err) => {});
    };

    confirmAlert({
      title: "Delete comment",
      message: "Are you sure you want to delete this comment?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDelete(),
        },
        {
          label: "Cancel",
          onClick: () => null,
        },
      ],
    });

    onDeletePress(data.id);
  };

  return (
    <div className="comment w-100 card shadow-sm mb-3 p-2">
      <div className="comment-header d-flex justify-content-between">
        <NavLink
          className="comment-author font-weight-bold"
          to={`/profile/${data.author_username}`}
          exact
        >
          {data.author_username}
        </NavLink>
        <span className="comment-date">
          {moment(data.published_on).format("MMM D, yyyy")}
        </span>
      </div>
      <div className="comment-body">
        <p>{data.comment}</p>
      </div>
      <div className="comment-controls">
        <button className="btn btn-link p-0 text-danger" onClick={handleDelete}>
          <span className="edit">Delete comment</span>
        </button>
      </div>
    </div>
  );
};

export default Comment;