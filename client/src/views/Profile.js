import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import Message from "../components/Message";

const Profile = () => {
  const { username } = useParams();
  const [state, setState] = useState({
    isLoading: true,
    errorFromServer: null,
    postsList: [],
  });

  useState(() => {
    (async () => {
      const result = await axios.get(`/api/posts/user/${username}`);
      const data = await result.data;

      if (!data.error) {
        setState({ ...state, postsList: data, isLoading: false });
      } else {
        setState({ ...state, errorFromServer: data.error, isLoading: false });
      }
    })();
  }, []);

  return (
    <div className="profile container">
      {state.isLoading ? (
        <Loading message="loading posts, wait..." />
      ) : state.errorFromServer ? (
        <Message title="Error!" type="error" message={state.errorFromServer} />
      ) : (
        <>
          <div className="text-center profile-header py-5 ">
            <h1 className="display-4">edwinmunguia's articles</h1>
          </div>
          <div className="posts row">
            {state.postsList.length > 0 ? (
              state.postsList.map((post) => <PostCard post={post} />)
            ) : (
              <Message
                title="Nothing here!"
                message={`${username} hasn't shared any post yet!.`}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
