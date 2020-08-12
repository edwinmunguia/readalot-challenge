import React from "react";
import { useFormik } from "formik";

const SignUp = () => {
  const validate = (values) => {
    const errors = {};

    //Validate the username
    if (!values.username) {
      errors.username = "Required";
    } else if (!/^([A-Z][\w]+){3,15}$/i.test(values.username)) {
      errors.username =
        "Username must be at least 3 characters long. Must be alpha-numeric and can contain underscores (_)";
    }

    //Let's valiate the email
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    //Check for the password
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    //Check for the password
    if (!values.repeatPassword || values.repeatPassword !== values.password) {
      errors.repeatPassword = "The password must be the same";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validate,
    onSubmit: (value) => {
      alert(value);
    },
  });

  return (
    <div className="login row justify-content-center">
      <div className="col-11 col-md-6 card shadow-sm py-3 px-4 my-5">
        <h3 className="mb-4">Authenticate</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
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
              <div className="invalid-feedback">{formik.errors.email}</div>
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
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-3">
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
            {formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
