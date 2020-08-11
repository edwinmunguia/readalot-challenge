import React from "react";
import { NavLink } from "react-router-dom";
import "./PostCard.css";

const PostCard = ({ id, slug, image, title, category, date, summary }) => {
  return (
    <NavLink className="col-12 col-md-4 cardlink" to={`/post/${id}/${slug}`} exact>
      <div className="card shadow-sm mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} alt={slug} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{summary}</p>
              <p className="card-text">
                <small className="text-muted">{category}</small> &middot;
                <small className="text-muted">{date}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default PostCard;
