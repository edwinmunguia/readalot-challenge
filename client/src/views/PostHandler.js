import React from "react";
import PostForm from "../components/PostForm";

const PostHandler = ({ mode, post }) => {
  const handlePostSubmit = (data) => {
    alert(data);
  };

  return (
    <div className="row post card">
      <h2 className="mb-3">{mode === "new" ? "Add new post" : "Edit post"}</h2>
      <PostForm initialData={mode === "edit" ? post : {}} onSubmit={} />
    </div>
  );
};

export default PostHandler;
