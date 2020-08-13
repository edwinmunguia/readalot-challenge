import React, { useState, useRef } from "react";
import axios from "axios";

const CommentForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const comment = useRef(null);

  const handleFormSubmit = () => {

  }
  return (
    <form className="comment-form p-2 bg-light rounded" onSubmit={handleFormSubmit}>
      <div className="mb-2">
        <textarea
          className="form-control"
          ref={comment}
          id="comment"
          name="comment"
          rows="3"
        />
      </div>
      <div>
        {!isProcessing ? (
          <button type="submit" className="btn btn-primary">
            Add comment
          </button>
        ) : (
          <div className="spinner-border text-success mb-3" role="status">
            <span className="sr-only">loading..</span>
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
