import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    post: {},
    postExist: false,
    errorMessage: "",
  });

  useEffect(() => {
    (async () => {
      const result = await fetch(`/api/posts/${id}`);
      const data = await result.json(result);
      if (!data.error) {
        const categories = data.categories
          .split(",")
          .map((item) => item.trim().toLowerCase());
        const post = { ...data, categories };
        setState({ ...state, isLoading: false, post, postExist: true });
      } else {
        setState({
          ...state,
          isLoading: false,
          post: null,
          postExist: false,
          errorMessage: data.error,
        });
      }
    })();
  });

  return (
    <section className="app__post container py-3">
      {state.isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading posts...</span>
        </div>
      ) : state.postExist ? (
        <>
          <div className="post__header">
            <h1 className="post__title">{state.post.title}</h1>
            <div className="post__image">
              <img src={state.post.image} />
            </div>
          </div>

          <div className="content">{state.post.summary}</div>
          <div className="post__details">
            <div className="post__details__tags">
              {state.post.categories.map((category, index) => (
                <NavLink key={index} to={`/posts/tag/${category}`}>{category}</NavLink>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>{state.errorMessage}</p>
        </div>
      )}
    </section>
  );
};

export default Post;
