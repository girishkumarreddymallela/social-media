 import axios from 'axios';
import './FetchData.css'; // Importing the CSS file

import { FaThumbsUp } from 'react-icons/fa';  
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';  
import MyContext from './MyContext';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
import CommentComponent from './Comment'; 
import CloseIcon from '@mui/icons-material/Close'; 




const FetchData = () => {
const [data, setData] = useState([]);  

const { setwannaanswerthis } = useContext(MyContext);
const [showComments, setShowComments] = useState("");


const convertDeltaToHtml = (delta) => {
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
};


  // Function to handle like button click
  const handleLike = async (id) => {
    const username = localStorage.getItem('username'); // Get username from local storage
    const token = localStorage.getItem('token'); // Get jwt token from local storage
    const config={
      method: 'post',
     // url: 'http://localhost:5000/message/add',
      url: 'https://social-media-app-sandy-one.vercel.app/message/add',  
      data: { messageId: id, likedBy: username }, // Modified JSON object
      headers: { Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    
    }
    }
    try {
      const response = await axios(config);
      console.log(response);

      if (response.status === 200) {
        // Update your state or do something with the response...
        setData(data.map(item => item._id === id ? {...item, noOfLikes: item.noOfLikes + 1} : item)); // Increase the like count in the state
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // get token from local storage
        const config = {
          method: 'get',
         // url: 'http://localhost:5000/message/send',  
          url: 'https://social-media-app-sandy-one.vercel.app/message/send',  
          
          headers: { 
            'Authorization': `Bearer ${token}` // add token to headers
          }
        };
        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);   

  
    

  
  
  return (
    <>
   
    
    <div className="container">
    <h6>All posts</h6>
    {data.map((item) => (
    
  <div key={item._id} className="post mediaquery-post"> 
     <p>Answered by {item.username}</p>
     <p>on {new Date(item.timestamp).toLocaleString()}</p> 
    <div className="message">
      <ul>
        <li><br/>{item.message.query}</li>
        <li><strong>Before proceeding u should know this prerequisite Knowledge.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.prerequisite) }} />
        </li>
        <li><strong>Here is the question that makes u think.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.question) }} />
        </li>
        <li><strong>U have tried right lets see its history.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.history) }} />
        </li>
        <li><strong>Now u are ready to learn but before that have a look on this anology.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.analogy) }} />
        </li>
        <li><strong>And here is the actual Explanation.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.explanation) }} />
        </li>
      </ul>
    </div>
    <div className='grey'>
    <div className="post-footer">
      <div className="likes-section">
        <button onClick={() => handleLike(item._id)} className="like-button"><FaThumbsUp /></button>
        <p> {item.noOfLikes}</p>
      </div>
      <div className="user-info">
        
        <Link  className="Answer" to="/answer2" onClick={() => setwannaanswerthis(item.message.query)}  >
             Answer
        </Link>
      </div>
    </div>  
    <button className='button' onClick={() => setShowComments((item._id))}>comments</button>
    </div>
    {(() => {
    const compare = showComments === item._id;
    if (compare) {  
      return (
        <>
          <button className='crossmark' onClick={() => setShowComments((""))}>
            <CloseIcon />
          </button>
          <CommentComponent postid={item._id} />
        </>
      );
    }
})()}



   </div> 

   

    ))}


</div>

<div class="spacer"></div>
  
    </>
  );
};

export default FetchData;   
 


/*import axios from 'axios';
import './FetchData.css'; // Importing the CSS file

import { FaThumbsUp } from 'react-icons/fa';  
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';  
import MyContext from './MyContext';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'; 
import CommentComponent from './Comment'; 
import CloseIcon from '@mui/icons-material/Close'; 




const FetchData = () => {
const [data, setData] = useState([]);  
const [skip, setSkip] = useState(0);

const limit = 2;

const { setwannaanswerthis } = useContext(MyContext);
const [showComments, setShowComments] = useState("");


const convertDeltaToHtml = (delta) => {
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
};


  // Function to handle like button click
  const handleLike = async (id) => {
    const username = localStorage.getItem('username'); // Get username from local storage
    const token = localStorage.getItem('token'); // Get jwt token from local storage
    const config={
      method: 'post',
      url: 'http://localhost:5000/message/add',
      data: { messageId: id, likedBy: username }, // Modified JSON object
      headers: { Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    
    }
    }
    try {
      const response = await axios(config);
      console.log(response);

      if (response.status === 200) {
        // Update your state or do something with the response...
        setData(data.map(item => item._id === id ? {...item, noOfLikes: item.noOfLikes + 1} : item)); // Increase the like count in the state
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const token = localStorage.getItem('token');
        const config = {
          method: 'get',
          url:`http://localhost:5000/message/send?limit=${limit}&skip=${skip}`,
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios(config);
        setData(prevData => [...prevData, ...res.data]);
        setSkip(prevSkip => prevSkip + limit);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    const handleScroll = () => {
      if ( window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        fetchData();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 
  
    
  
  
  return (
    <>
   
    
    <div className="container"  >
    <h6>All posts</h6>
    {data.map((item) => (
    
  <div key={item._id} className="post mediaquery-post"  > 
     <p>Answered by {item.username}</p>
     <p>on {new Date(item.timestamp).toLocaleString()}</p> 
    <div className="message">
      <ul>
        <li><br/>{item.message.query}</li>
        <li><strong>Before proceeding u should know this prerequisite Knowledge.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.prerequisite) }} />
        </li>
        <li><strong>Here is the question that makes u think.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.question) }} />
        </li>
        <li><strong>U have tried right lets see its history.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.history) }} />
        </li>
        <li><strong>Now u are ready to learn but before that have a look on this anology.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.analogy) }} />
        </li>
        <li><strong>And here is the actual Explanation.</strong><br/>
          <div className="quill-content" dangerouslySetInnerHTML={{ __html: convertDeltaToHtml(item.message.explanation) }} />
        </li>
      </ul>
    </div>
    <div className='grey'>
    <div className="post-footer">
      <div className="likes-section">
        <button onClick={() => handleLike(item._id)} className="like-button"><FaThumbsUp /></button>
        <p> {item.noOfLikes}</p>
      </div>
      <div className="user-info">
        
        <Link  className="Answer" to="/answer2" onClick={() => setwannaanswerthis(item.message.query)}  >
             Answer
        </Link>
      </div>
    </div>  
    <button className='button' onClick={() => setShowComments((item._id))}>comments</button>
    </div>
    {(() => {
    const compare = showComments === item._id;
    if (compare) {  
      return (
        <>
          <button className='crossmark' onClick={() => setShowComments((""))}>
            <CloseIcon />
          </button>
          <CommentComponent postid={item._id} />
        </>
      );
    }
})()}



   </div> 

   

    ))}


</div>

<div class="spacer"></div>
  
    </>
  );
};

export default FetchData;    */
 