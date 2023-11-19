

import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const [message, setMessage] = useState(''); // Moved useState hook here
  const [isError, setIsError] = useState(true); // Add this line

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://social-media-app-sandy-one.vercel.app/auth/register', values, {         //'http://localhost:5000/auth/register'    //'https://social-media-app-iota-ecru.vercel.app/auth/register'
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        setMessage(response.data);
        setIsError(false); // Add this line
        // navigate('/login'); // Redirect to Login page after successful registration
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage(err.response.data);
        setIsError(true); // Add this line
      } else {
        console.error(err);
        setIsError(true); // Add this line
        setMessage('Error registering new user. Please try again later.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    


<div className='AA'>
<div className="A">
<h3 className="B">Register</h3>
{message && <p className={isError ? "C" : "C-success"}>{message}</p>} {/* Modify this line */}
<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
  {({ isSubmitting  }) => (
    <Form>
      <div className="D">
        <label htmlFor="username">Username</label>
        <Field name="username" type="text" className="E"  />
        <ErrorMessage name="username" component="div" className="F"  />
      </div>
      <div className="G">
        <label htmlFor="password">Password</label>
        <Field name="password" type="password" className="H" />
        <ErrorMessage name="password" component="div" className="I" />
      </div>
      <button type="submit" disabled={isSubmitting} className="J">Register</button>
    </Form>
  )}
</Formik>
<p className="K">Already have an account? <Link to="/Login" className="L">Log in</Link></p>
</div>
</div>
);
};

export default Register; 


