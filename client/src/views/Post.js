import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  console.log(useParams());
  const [state, setState] = useState({ isLoading: true, post: {} });

  useEffect(() => {
    alert(id);
    (async () => {
      const result = await fetch(`/posts/${id}`);
      const data = await result.json(result);

      if (!data.error) setState({ ...state, isLoading: false, post: data });
    })();
  });

  return (
    <div className="app__post container">
      <h1>{state.post.title}s</h1>
    </div>
  );
};

export default Post;
