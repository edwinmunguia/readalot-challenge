import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Message from "../components/Message";

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
      const response = await axios.get(`/api/posts/${id}`);
      const data = await response.data;
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
      <div className="row justify-content-center">
        {state.isLoading ? (
          <Loading message="were loading something special for you, please, wait..." />
        ) : state.postExist ? (
          <>
            <div class="post-heading">
              {state.post.categories.length > 0 &&
                state.post.categories.map((category, index) => (
                  <NavLink
                    className="mr-2"
                    key={index}
                    to={`/posts/tag/${category}`}
                  >
                    <span className="category">#{category}</span>
                  </NavLink>
                ))}
              <span class="separator">&#8226;</span>
              <span class="published">{state.post.date}</span>
              <h1 class="mb-3">{state.post.title}</h1>
              <div class="summary">{state.post.summary}</div>
            </div>
            <div
              className="post-cover"
              style={{ backgroundImage: `url("${state.post.image}")` }}
            ></div>

            <div class="post-content my-5">
              <p>
                Never in all their history have men been able truly to conceive
                of the world as one: a single sphere, a globe, having the
                qualities of a globe, a round earth in which all the directions
                eventually meet, in which there is no center because every
                point, or none, is center — an equal earth which all men occupy
                as equals. The airman's earth, if free men make it, will be
                truly round: a globe in practice, not in theory.
              </p>

              <h2>The Final Frontier</h2>

              <blockquote class="blockquote">
                The dreams of yesterday are the hopes of today and the reality
                of tomorrow. Science has not yet mastered prophecy. We predict
                too much for the next year and yet far too little for the next
                ten.
                <div class="source">Edwin J. Munguia</div>
              </blockquote>

              <div class="image-container">
                <a href="/">
                  <img
                    src="https://blackrockdigital.github.io/startbootstrap-clean-blog/img/post-sample-image.jpg"
                    alt=""
                  />
                </a>
                <span class="caption text-muted">
                  To go places and do things that have never been done before –
                  that’s what living is all about.
                </span>
              </div>
            </div>
          </>
        ) : (
          <Message
            title="Bad News!"
            message={state.errorMessage}
            type="error"
          />
        )}
      </div>
    </section>
  );
};

export default Post;
