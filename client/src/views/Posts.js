import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import Message from "../components/Message";

const Posts = () => {
  const [state, setState] = useState({ isLoading: true, postsList: [] });

  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/posts");
      const data = await result.data;

      setState({ ...state, postsList: data, isLoading: false });
    })();
  }, []);

  return (
    <section className="posts container">
      {state.isLoading ? (
        <Loading message="loading posts, wait..." />
      ) : (
        <>
          <h2 className="mb-3">Good reads!</h2>
          <div className="row">
            {state.postsList.length > 0 ? (
              state.postsList.map((post) => <PostCard post={post} />)
            ) : (
              <Message
                title="So sad!"
                message="It looks like nobody has written something yet. why not to be the first!"
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Posts;
