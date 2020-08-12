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
      {state.isLoading ? (
        <Loading message="loading posts, wait..." />
      ) : state.postsList.length > 0 ? (
        <>
          <h2 className="mb-3">Recent Posts</h2>
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
        </>
      ) : (
        <div className="app-message normal w-50 align-self-center">
          <h3 className="title">So sad!</h3>
          <p className="message">
            It looks like nobody has written something yet. why not be the
            first?
          </p>
        </div>
      )}
    </section>
  );
};

export default Posts;
