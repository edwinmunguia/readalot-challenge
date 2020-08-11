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
    <div className="app__posts">
      <h2 className="mb-3">Recent Posts</h2>
      {state.isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading posts...</span>
        </div>
      ) : (
        <div className="row">
          {state.postsList.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              slug={post.slug}
              title={post.title}
              image={post.image}
              content={post.content}
              category={post.category}
              summary={post.summary}
              date={post.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
