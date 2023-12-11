import React from 'react';

import Navbar from './Navbar';
import { Link } from 'react-router-dom'; 
import "./Dashboard.css";
const Dashboard = () => {
  
  const username = localStorage.getItem('username'); // Retrieve username
  return (  
<>

    <Navbar />
    <div className='A0'>
      
      
      
      <h4>Welcome, {username}!</h4>
      <p>Greetings and a warm welcome to our platform, {username}! Our mission is to foster an environment where knowledge flourishes and curiosity finds its answers. Our website has been meticulously crafted to encourage insightful discussions and offers a unique approach to the exchange of information. <br/>
     </p>
      
      <p>This platform stands apart from the traditional question-and-answer applications. Here, users play a significant role in nurturing a learning community. Users are encouraged to share their knowledge by posing questions and providing comprehensive answers that follow a structured pattern, enhancing the understanding of readers.</p>
      
      <p>The answer submission pattern is designed to ensure readers gain a profound understanding of a concept. The sequence is meticulous:</p>
      
      <ol>
        <li><strong>Prerequisite Knowledge:</strong> The answerer must meticulously provide comprehensive prerequisite knowledge. Starting from the concept's origin, they delve into the reasons behind its emergence and explore the key contributors who shaped the concept's development.</li>
        
        <li><strong>Question Formation:</strong> Following the prerequisite knowledge, the answerer formulates a question that makes the listener actually to think about it as it was think bt the researchers or inventors of that concept.</li>
        
        <li><strong>Historical Context:</strong> An in-depth explanation of the historical context related to the posed question. This section elaborates on past experiments, results, and the evolution of the concept.</li>
        
        <li><strong>Concept Illustration:</strong> The answerer elucidates the concept using analogies or stories, providing a relatable context to facilitate the understanding of readers.</li>
        
        <li><strong>Simplified Explanation:</strong> Finally, the concept is explained in simple, accessible English. This step ensures a clear and comprehensive understanding for readers from diverse backgrounds.</li>
      </ol>
      
      <p>We encourage users to utilize simple language to effectively communicate complex ideas. By using straightforward language, we aim to make intricate concepts more accessible and understandable to all readers.</p>
      
      <h1>Ready to start exploring? Share your thoughts and knowledge by clicking the button below</h1>
      <Link to="/data" className='buttons'><button >Start</button></Link>
    </div> 
    </>
  );
};

export default Dashboard;
