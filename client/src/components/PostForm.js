import React from "react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";

const PostForm = ({onSubmit, isProcessing}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      categories: "",
    },
    validateonChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Title must have at least 2 characters or more")
        .max(40, "Title must have less than 41 characters"),
      content: Yup.string().min(
        240,
        "Your content is too poor! Write at least 240 characters"
      ),
    }),
    onSubmit: (formData) => onSubmit(formData),
  });

  const handlePostType = ()=> {

  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div class="mb-4">
        <label for="exampleFormControlInput1" class="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          placeholder="Set a great post title"
        />
        {formik.errors.title && (
          <div className="d-block invalid-feedback">{formik.errors.title}</div>
        )}
      </div>
      <div class="mb-4">
        {formik.errors.content && (
          <div className="d-block invalid-feedback">
            {formik.errors.content}
          </div>
        )}
        <textarea
          class="form-control"
          id="content"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          rows="7"
        />
      </div>
      <div class="mb-4">
        <label htmlFor="tags" class="form-label">
          Categories
        </label>
        <input
          type="text"
          class="form-control"
          id="categories"
          name="categories"
          value={formik.values.categories}
          onChange={formik.handleChange}
          placeholder="E.g tutorial, review, code, cooking and so forth..."
        />
      </div>
      <div className="mt-4 d-flex justify-content-between">
      {!isProcessing ? (
            <button type="submit" className="btn btn-primary">
              Publish
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

export default PostForm;
