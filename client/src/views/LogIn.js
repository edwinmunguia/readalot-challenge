import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { authStorage } from "../utils/authstorage";

const LogIn = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState(null);
  const { logInUser } = useContext(AuthContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("You need to provide an email"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters or more")
        .required("Provide a valid password"),
    }),
    onSubmit: async (formData) => {
      setIsProcessing(true);
      const response = await axios.post("/api/auth/login", formData);
      const data = await response.data;

      if (!data.error) {
        logInUser(data.user, data.token);
        authStorage.save(data.user, data.token);
        setIsProcessing(false);
        history.push("/");
      } else {
        setErrorFromServer(data.error);
        setIsProcessing(false);
      }
    },
  });

  return (
    <div className="login row justify-content-center">
      <div className="col-11 col-md-6 card shadow-sm py-3 px-4 my-5">
        <h3 className="mb-4">Authenticate</h3>
        {errorFromServer && (
          <div className="alert alert-danger" role="alert">
            {errorFromServer}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
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
          <div className="mb-3">
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
          {!isProcessing ? (
            <button type="submit" className="btn btn-primary">
              Log in
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

export default LogIn;
