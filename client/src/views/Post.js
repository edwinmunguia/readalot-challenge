import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import CustomPostImage from "../components/CustomPostImage";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";

const renderers = {
  image: CustomPostImage,
};

const Post = () => {
  const { id } = useParams();
  const { loggedInUser } = useContext(AuthContext);
  const [state, setState] = useState({
    isLoading: true,
    post: {},
    comments: [],
    postExist: false,
    errorMessage: "",
  });

  useEffect(() => {
    (async () => {
      const responses = await Promise.all([
        axios.get(`/api/posts/${id}`),
        axios.get(`/api/comments/post/${id}`),
      ]);

      const postData = await responses[0].data;
      const commentsData = await responses[1].data;

      if (!postData.error) {
        const categories =
          postData.categories.length > 0
            ? postData.categories
                .split(",")
                .map((item) => item.trim().toLowerCase())
            : [];
        const post = { ...postData, categories };
        setState({
          ...state,
          isLoading: false,
          post,
          comments: commentsData,
          postExist: true,
        });
      } else {
        setState({
          ...state,
          isLoading: false,
          post: null,
          comments: [],
          postExist: false,
          errorMessage: postData.error,
        });
      }
    })();
  }, []);

  const handleNewComment = (data) => {
    const newCommentsList = [...state.comments, data];
    setState({ ...state, comments: newCommentsList });
  };

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
              <div class="summary">{state.post.summary}...</div>
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
              <ReactMarkdown
                source={state.post.content}
                renderers={renderers}
              />
            </div>
            <div className="comments row justify-content-center">
              <div className="col-11 col-md-7">
                <h3>Post's comments</h3>
                {loggedInUser.isLoggedIn ? (
                  <CommentForm
                    post={id}
                    user={loggedInUser}
                    onAddComment={handleNewComment}
                  />
                ) : (
                  <div className="login-to-comment">
                    You must log in to comment this post.
                  </div>
                )}
                {state.comments.length > 0 ? (
                  <div className="comments-list py-4">
                    {state.comments.map((comment) => (
                      <Comment key={comment.id} data={comment} />
                    ))}
                  </div>
                ) : (
                  <div className="no-comments mt-4">No comments yet.</div>
                )}
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
