import React from "react";

const CustomPostImage = (props) => {
  return (
    <div className="image-container">
      <img alt={props.alt} src={props.src} />
    </div>
  );
};
export default CustomPostImage;
