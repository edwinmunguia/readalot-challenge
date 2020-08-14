import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { authStorage } from "../utils/authstorage";

const SignUp = () => {
  const [state, setState] = useState({
    isProcessing: false,
    errorFromServer: null,
  });
  const { logInUser } = useContext(AuthContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("The username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("The email is required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters or more")
        .required("Please, provide a valid password"),
      repeatPassword: Yup.string()
        .required("Passwords must match")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (formData) => {
      setState({ isProcessing: true });
      const response = await axios.post("/api/auth/signup", formData);
      const data = await response.data;

      if (!data.error) {
        logInUser(data.user, data.token);
        authStorage.save(data.user, data.token);
        setState({ isProcessing: false, errorFromServer: null });
        history.push("/");
      } else {
        setState({ isProcessing: false, errorFromServer: data.error });
      }
    },
  });

  return (
    <div className="login row justify-content-center">
      <div className="col-11 col-md-6 card shadow-sm py-3 px-4 my-5">
        <h3 className="mb-4">Create account</h3>
        {state.errorFromServer && (
          <div className="alert alert-danger" role="alert">
            {state.errorFromServer}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.email && (
              <div className="d-block invalid-feedback">
                {formik.errors.username}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className="d-block invalid-feedback">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <div className="d-block invalid-feedback">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="password" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repeatPassword"
                name="repeatPassword"
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
              />
              {formik.errors.repeatPassword && (
                <div className="d-block invalid-feedback">
                  {formik.errors.repeatPassword}
                </div>
              )}
            </div>
          </div>
          {!state.isProcessing ? (
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          ) : (
            <div className="spinner-border text-success mb-3" role="status">
              <span className="sr-only">loading..</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
