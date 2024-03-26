import React, { useState } from "react";
// ... other imports ...

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  // ... other code ...
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const [message, setMessage] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    const config = {
      method: "post",
      url: "http://localhost:5000/auth/login",
      // url: 'https://social-media-app-sandy-one.vercel.app/auth/login',
      headers: { "Content-Type": "application/json" },
      data: values,
    };

    try {
      const response = await axios(config);
      console.log(response);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", values.username); // Store username
      navigate("/dashboard");
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setMessage("Incorrect username or password");
            break;
          case 500:
            setMessage("Internal error, please try again");
            break;
          default:
            setMessage("An error occurred");
            break; // Don't forget to break after each case
        }
      } else {
        setMessage(
          "seems like Network error check Your internet connection or else  please try after some time"
        ); // Handle other types of errors
      }
      setSubmitting(false);
    }
  };

  return (
    <>
      <div>
        <p>
          Dummy username and password both :<span>girish</span>
        </p>
      </div>
      <div className="AA">
        <div className="A">
          <h3 className="B">Login</h3>
          {message && <p className="C">{message}</p>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="D">
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className="E" />
                  <ErrorMessage name="username" component="div" className="F" />
                </div>
                <div className="G">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className="H" />
                  <ErrorMessage name="password" component="div" className="I" />
                </div>
                <button type="submit" disabled={isSubmitting} className="J">
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="K">
            Don't have an account?{" "}
            <Link to="/register" className="L">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
