import React, { useEffect, useState, useContext } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { AuthContext } from "../contexts/AuthContext";
import { CommentsContext } from "../contexts/CommentsContext";
import CustomPostImage from "../components/CustomPostImage";
import Comments from "../components/Comments";

const renderers = {
  image: CustomPostImage,
};

const Post = () => {
  const { id } = useParams();
  const { loggedInUser } = useContext(AuthContext);
  const { commentsList, addCommentsList } = useContext(CommentsContext);
  const [state, setState] = useState({
    isLoading: true,
    post: {},
    postExist: false,
    errorMessage: "",
    errorOnDeleting: null,
  });
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const responses = await Promise.all([
        axios.get(`/api/posts/${id}`),
        axios.get(`/api/comments/post/${id}`),
      ]);

      const postData = await responses[0].data;
      const commentsData = await responses[1].data;
      addCommentsList(commentsData);

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
          postExist: true,
        });
      } else {
        setState({
          ...state,
          isLoading: false,
          post: null,
          postExist: false,
          errorMessage: postData.error,
        });
      }
    })();
  }, []);

  const handleDeletePost = () => {
    const deletePostFromServer = () => {
      axios
        .delete(`/api/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": loggedInUser.token,
          },
        })
        .then((result) => {
          const data = result.data;
          if (!data.error) {
            //Removes, Let's go to the main page
            history.push("/");
          } else {
            setState({
              ...state,
              errorOnDeleting: data.error,
            });
          }
        })
        .catch((err) => {});
    };

    confirmAlert({
      title: "Delete post?",
      message: "Are you sure you want to delete permanently this post?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deletePostFromServer(),
        },
        {
          label: "Cancel",
          onClick: () => null,
        },
      ],
    });
  };

  return (
    <section className="app__post py-3">
      <div className="article-container justify-content-center">
        {state.isLoading ? (
          <Loading message="were loading something special for you, please, wait..." />
        ) : state.postExist ? (
          <>
            {state.errorOnDeleting && (
              <div className="alert alert-danger" role="alert">
                {state.errorOnDeleting}
              </div>
            )}
            <div class="post-heading">
              {state.post.categories.length > 0 && (
                <div className="categories">
                  {state.post.categories.map((category, index) => (
                    <span className="category">#{category}</span>
                  ))}
                  <span class="separator">&#8226;</span>
                </div>
              )}
              <span class="published">
                {moment(state.post.published_on).format("MMM D, yyyy")}
              </span>
              {loggedInUser.isLoggedIn &&
                loggedInUser.user.id === state.post.author_id && (
                  <div className="d-block mt-1 d-md-inline-block mt-md-0 post-actions">
                    <span class="separator d-none d-md-inline">&#8226;</span>
                    <NavLink
                      className="mr-2"
                      to={`/posts/edit/${state.post.id}`}
                    >
                      <span className="btn btn-link px-0">Edit post</span>
                    </NavLink>
                    <span class="separator">&#8226;</span>
                    <button
                      className="btn btn-link mr-2 px-0"
                      onClick={handleDeletePost}
                    >
                      <span className="edit">Delete post</span>
                    </button>
                  </div>
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
            <Comments data={commentsList} />
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
