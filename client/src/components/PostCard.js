import React from "react";
import { NavLink } from "react-router-dom";

const PostCard = ({ id, slug, image, title, category, date, summary }) => {
  return (
    <NavLink to={`/post/${id}/${slug}`} exact>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} alt={slug} />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{title}</h5>
              <p class="card-text">{summary}</p>
              <p class="card-text">
                <small class="text-muted">{category}</small> &middot;
                <small class="text-muted">{date}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default PostCard;
