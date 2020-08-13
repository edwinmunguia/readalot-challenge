import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const Comment = ({ data }) => {
  return (
    <div className="comment w-100 card shadow-sm mb-3 p-2">
      <div className="comment-header d-flex justify-content-between">
        <NavLink
          className="comment-author font-weight-bold text-primary"
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
    </div>
  );
};

export default Comment;
