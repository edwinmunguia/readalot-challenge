import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const PostCard = ({ post }) => {
  return (
    <NavLink
      className="col-12 col-md-6 col-lg-4 cardlink"
      to={`/post/${post.id}/${post.slug}`}
      exact
    >
      <div className="card shadow rounded mb-4">
        {post.image.length > 0 && (
          <img src={post.image} class="card-img-top" alt={post.slug} />
        )}
        <div className="card-body">
          <h4 className="card-title">{post.title}</h4>
          <div className="py-1">
            {post.categories.length > 0 &&
              post.categories
                .split(",")
                .map((item) => (
                  <small className="text-muted mr-1">
                    #{item.trim().toLowerCase()}
                  </small>
                ))}
          </div>
          <p className="card-text">{post.summary}</p>
        </div>
        <div className="card-body d-flex justify-content-between">
          <div className="author">
            <NavLink
              className="author-link font-weight-bold"
              to={`/profile/${post.author_username}`}
              exact
            >
              {post.author_username}
            </NavLink>
          </div>
          <p className="card-text">
            <small className="text-muted">
              {moment(post.date).format("MMM D, yyyy")}
            </small>
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default PostCard;
