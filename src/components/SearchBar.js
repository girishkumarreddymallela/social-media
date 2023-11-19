
/*{import React  from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MyContext from './MyContext';
import  { useContext}  from 'react'; // Import useContext
import SearchIcon from '@mui/icons-material/Search';  //


import { useNavigate } from 'react-router-dom';
import "./A2-SearchBar.css";

const Query = () => {
  const { setsearchdata } = useContext(MyContext);
  
  const navigate = useNavigate(); // add this line

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('token'); // get token from local storage
  
      const config = {
        method: 'post',
        url: 'http://localhost:5000/message/search',
        headers: {
          'Authorization': `Bearer ${token}`, // add token to headers
          'Content-Type': 'application/json' // specify content type
        },
        data: values
      };
      const response = await axios(config);
      console.log(response);
  
      setsearchdata(response.data); // set search data
      resetForm({}); // clear the form after successful submission
      navigate('/search'); // navigate after form submission is complete
    } catch (error) {
      console.error('Error storing data:', error);
    }
    setSubmitting(false);
  };
  

  return (
   

<div className="A2">
  <h3 className="B2">Search Bar</h3>
  <Formik initialValues={{ query: '' }} validationSchema={Yup.object({ query: Yup.string().required('Required') })} onSubmit={handleSubmit} className="C2">
    <Form className="D2">
      <Field name="query" type="text" placeholder="Enter some text here..." className="E2" />
    
      <button type="submit" className="G2">
        <SearchIcon />  
        
      </button> <br/>
      <ErrorMessage name="query" component="div" className="F2" />
    </Form>
  </Formik>
</div>

  );
};

export default Query; }*/   



import React  from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MyContext from './MyContext';
import  { useContext}  from 'react'; // Import useContext
import SearchIcon from '@mui/icons-material/Search';  //


import { useNavigate } from 'react-router-dom';
import "./A2-SearchBar.css";

const Query = () => {
  const { setsearchdata } = useContext(MyContext);
  
  const navigate = useNavigate(); // add this line

  const handleSubmit =  (values, { setSubmitting, resetForm }) => {
   
  
      setsearchdata(values.query); // set search data
      resetForm({}); // clear the form after successful submission
      navigate('/search'); // navigate after form submission is complete
   
    setSubmitting(false);
  };
  

  return (
   

<div className="A2">
  <h3 className="B2">Search Bar</h3>
  <Formik initialValues={{ query: '' }} validationSchema={Yup.object({ query: Yup.string().required('Required') })} onSubmit={handleSubmit} className="C2">
    <Form className="D2">
      <Field name="query" type="text" placeholder="Enter some text here..." className="E2" />
    
      <button type="submit" className="G2">
        <SearchIcon />  
        
      </button> <br/>
      <ErrorMessage name="query" component="div" className="F2" />
    </Form>
  </Formik>
</div>

  );
};

export default Query; 



