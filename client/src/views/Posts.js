import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

const Posts = () => {
  const [state, setState] = useState({ isLoading: true, postsList: [] });

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/posts");
      const data = await result.json();
      setState({ ...state, postsList: data, isLoading: false });
    })();
  }, []);

  return (
    <div className="posts">
      <h2 className="mb-3">Recent Posts</h2>
      {isLoading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading posts...</span>
        </div>
      ) : (
        <div className="row">
          {postsList.map((post) => (
            <PostCard {...post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
