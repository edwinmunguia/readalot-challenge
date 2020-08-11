import React from "react";
import PropTypes from "prop-types";

const Loading = (props) => {
  return (
    <div className="container d-flex flex-column py-5 my-5 align-items-center">
      <div className="spinner-border text-success mb-3" role="status">
        <span className="sr-only">{props.message}</span>
      </div>
      <p>{props.message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};
Loading.defaultProps = {
  message: "Loading...",
};
export default Loading;
