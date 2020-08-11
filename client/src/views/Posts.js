import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

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
    <section className="app__posts">
      <h2 className="mb-3">Recent Posts</h2>
      {state.isLoading ? (
        <Loading message="loading posts, wait..." />
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
    </section>
  );
};

export default Posts;
