

import  { useState } from 'react';
import MyContext from './components/MyContext'; // Import the context
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PostPage from './pages/postPage/postPage';
import DataAndAnswerQuery from './pages/postPage/dataQueryAnswerPage';
import SearchResultPage from './pages/postPage/SearchResultPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Query from './components/Query';
import Answer from './components/Answer';
import PostPage2 from './pages/postPage/postPage2';


function App() {
  const [query, setQuery] = useState(''); // Shared state for query and post page
  const [searchdata, setsearchdata] = useState('');//actually it is array
  const [wannaanswerthis, setwannaanswerthis] = useState(''); // Shared state for query and post page


  return (
    <MyContext.Provider value={{ query, setQuery, searchdata , setsearchdata, wannaanswerthis, setwannaanswerthis }}> {/* Provide the context */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Login />} />
          <Route path="/answer" element={<PostPage />} />
          <Route path="/data" element={<DataAndAnswerQuery />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/postquestion" element={<Query />} />
          <Route path="/answerquestion" element={<Answer />} />
          <Route path="/answer2" element={<PostPage2 />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
