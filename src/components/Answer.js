

import React, { useContext, useEffect, useState } from 'react'; // Import useContext
import MyContext from './MyContext';
import './Answer.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import Navbar from "./Navbar" ;

const Answer = () => {
  // State variables
  const [information, setInformation] = useState([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState(window.innerWidth <= 768);

  // Context variables
  const { setQuery } = useContext(MyContext);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          method: 'get',
          //url: 'http://localhost:5000/message/query',
          url: 'https://social-media-app-sandy-one.vercel.app/message/query',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios(config);
        setInformation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsNavbarVisible(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render the component
  return (
    <>
      {isNavbarVisible && <Navbar />}

      <div className="answer-container">
        <h3 className="title">Answer the queries</h3>
        {information.map((item) => (
          <div key={item._id}>
            <Link
              to="/answer"
              onClick={() => setQuery(item.query)}
              className="query-link"
              style={{ textDecoration: 'none', color: 'dark' }}
            >
              <h4 className="query">Question: {item.query}</h4>
              <p className="asked-by">Asked By: {item.AskedBy}</p>
            </Link>
          </div>
        ))}
        <div className="answertrick"></div>
      </div>
    </>
  );
};

export default Answer;
