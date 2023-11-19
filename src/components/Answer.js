

import React, { useContext, useEffect, useState } from 'react'; // Import useContext
import MyContext from './MyContext';
import './Answer.css';
import axios from 'axios';

import { Link } from 'react-router-dom'; // Import Link
import Navbar from "./Navbar" ;




const Answer = () => {
  const [information, setinformation] = useState([]); 
  const [isNavbarVisible, setIsNavbarVisible] = useState(window.innerWidth <= 768); // set initial state based on screen width

  const { setQuery } = useContext(MyContext); // Get setQuery from context

  useEffect(() => {
    // Fetch data...
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // get token from local storage
        const config = {
          method: 'get',
         //url: 'http://localhost:5000/message/query', 
         url: 'https://social-media-app-sandy-one.vercel.app/message/query',  

          headers: { 
            'Authorization': `Bearer ${token}` // add token to headers
          }
        };
        const response = await axios(config);
        setinformation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


  }, []);
      

  // Add a listener for window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsNavbarVisible(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (  
    <>
     {isNavbarVisible && <Navbar />}
   
    <div className="answer-container " >
      
      <h3  className="title">Answer the quiries</h3>
      {information.map((item) => (
        <div key={item._id}>
          <Link to="/answer" onClick={() => setQuery(item.query)} className="query-link" style={{ textDecoration: 'none', color: 'dark' }} > {/* Update shared state */}
            <h4 className="query">Question: {item.query}</h4> 
            <p  className="asked-by">Asked By: {item.AskedBy}</p> 
          </Link> 
        </div> 
        
      ))} 
       <div className='answertrick'></div>
    </div> 
    </>
  );
};

export default Answer;
