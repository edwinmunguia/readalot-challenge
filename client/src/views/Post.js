import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import CustomPostImage from "../components/CustomPostImage";

const renderers = {
  image: CustomPostImage
};

const Post = () => {
  const { id } = useParams();
  const { loggedInUser } = useContext(AuthContext);
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
        const categories =
          data.categories.length > 0
            ? data.categories
                .split(",")
                .map((item) => item.trim().toLowerCase())
            : [];
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
              <span class="published">
                {moment(state.post.published_on).format("MMM D, yyyy")}
              </span>
              {loggedInUser.isLoggedIn &&
                loggedInUser.user.id === state.post.author_id && (
                  <>
                    <span class="separator">&#8226;</span>
                    <NavLink
                      className="mr-2"
                      to={`/posts/edit/${state.post.id}`}
                    >
                      <span className="btn btn-link px-0">Edit post</span>
                    </NavLink>
                    <span class="separator">&#8226;</span>
                    <button
                      className="btn btn-link mr-2 px-0"
                      to={`/posts/edit/${state.post.id}`}
                    >
                      <span className="edit">Delete post</span>
                    </button>
                  </>
                )}
              <h1 class="mb-3">{state.post.title}</h1>
              <div class="summary">{state.post.summary}</div>
              <div className="author mt-4">
                <NavLink to={`/profile/${state.post.author_username}`}>
                  <span className="category">
                    by <b>{state.post.author_username}</b>
                  </span>
                </NavLink>
              </div>
            </div>
            <div
              className="post-cover"
              style={{ backgroundImage: `url("${state.post.image}")` }}
            ></div>

            <div class="post-content my-5">
              <ReactMarkdown source={state.post.content} renderers={renderers} />
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
