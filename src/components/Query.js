import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Query = () => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [isNavbarVisible, setIsNavbarVisible] = useState(
    window.innerWidth <= 768
  ); // set initial state based on screen width

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputValue) {
      alert("Input field is empty. Please enter your query.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // get token from local storage
      const username = localStorage.getItem("username");
      const config = {
        method: "post",
        url: "http://localhost:5000/message/query",
        //url: 'https://social-media-app-sandy-one.vercel.app/message/query',
        headers: {
          Authorization: `Bearer ${token}`, // add token to headers
          "Content-Type": "application/json", // specify content type
        },
        data: {
          query: inputValue,
          AskedBy: username, // your message data
        },
      };
      await axios(config);
      setMessage("query submitted sucessfully.");
      setInputValue(""); // clear the input field after successful submission
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  // Add a listener for window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsNavbarVisible(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isNavbarVisible && <Navbar />}

      <div style={{ backgroundcolor: "aliceblue" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            border: "2px solid blue", // Add a blue border
            marginTop: "20px",
            margin: "2px 10px",
          }}
        >
          <h1 style={{ color: "#007BFF" }}>Welcome to our Social Media App</h1>
          <p style={{ textAlign: "center" }}>
            We're here to help you with any doubts you might have. Please enter
            your doubt in the box below and our community will do their best to
            help you.
          </p>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your doubt here..."
            style={{
              padding: "10px",
              fontSize: "1em",
              width: "100%",
              borderRadius: "5px",
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Submit
          </button>
          {message && <p style={{ color: "#6c757d" }}>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Query;
