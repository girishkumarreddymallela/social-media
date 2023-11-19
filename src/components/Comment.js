import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./A4-comment.css";
const CommentComponent = ({postid }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('token'); 
      try {
        const response = await axios({
          method: 'post',
          url: 'http://localhost:5000/comment/send',
          data: { "commentedTo": postid },
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setComments(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [newComment, postid]);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('token'); 
    const commentedBy = localStorage.getItem('username'); 
    try {
      const response = await axios({
        method: 'post',
       // url: 'http://localhost:5000/comment/add', 
       url: 'https://social-media-app-iota-ecru.vercel.app/comment/add',
        data: { "comment": newComment, "commentedTo": postid, "commentedBy": commentedBy },
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log(response);
      setNewComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="A4">
    <div className='A4M'>
    <textarea type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} className="B4" />
    <button onClick={handleCommentSubmit} className="C4">Add </button> 
    </div>
    {comments.map((comment, index) => (
      <div key={index} className="D4">
        <span className="F4"> {comment.commentedBy}-</span>
        <p className="E4">{comment.comment}</p>
       
      </div>
    ))}
  </div>
  );
};

export default CommentComponent;
