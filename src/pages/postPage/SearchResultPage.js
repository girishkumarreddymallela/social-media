import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaThumbsUp } from "react-icons/fa";

import MyContext from "../../components/MyContext";
import { useContext } from "react";
import "./SearchResultPage.css";
import Navigation from "../../components/Navbar";

import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const SearchResultPage = () => {
  const { searchdata } = useContext(MyContext);
  const [data, setData] = useState([]);

  const convertDeltaToHtml = (delta) => {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    return converter.convert();
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const token = localStorage.getItem("token"); // get token from local storage

        // Get searchdata from sessionStorage
        const persistedSearchData = JSON.parse(
          sessionStorage.getItem("searchdata")
        );

        // Use searchdata if available, otherwise use persistedSearchData
        const queryData = searchdata || persistedSearchData;

        const config = {
          method: "post",
          // url: "http://localhost:5000/message/search",
          url: "https://social-media-app-sandy-one.vercel.app/message/search",
          headers: {
            Authorization: `Bearer ${token}`, // add token to headers
            "Content-Type": "application/json", // specify content type
          },
          data: { query: queryData },
        };
        const response = await axios(config);
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchdata) {
      sessionStorage.setItem("searchdata", JSON.stringify(searchdata));
    }

    handleSubmit();
  }, [searchdata]); // add searchdata as a dependency

  // Function to handle like button click
  const handleLike = async (id) => {
    const username = localStorage.getItem("username"); // Get username from local storage
    const token = localStorage.getItem("token"); // Get jwt token from local storage
    const config = {
      method: "post",
      // url: "http://localhost:5000/message/add",
      url: "https://social-media-app-sandy-one.vercel.app/message/add",
      data: { messageId: id, likedBy: username }, // Modified JSON object
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios(config);
      console.log(response);

      if (response.status === 200) {
        // Update your state or do something with the response...
        setData(
          data.map((item) =>
            item._id === id ? { ...item, noOfLikes: item.noOfLikes + 1 } : item
          )
        ); // Increase the like count in the state
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="Searchcontainer">
        {data.length === 0 ? (
          <h1>
            {" "}
            sorry , your query havent been matched to any related data in our
            database
          </h1>
        ) : (
          data.map((item) => (
            <div key={item._id} className="post">
              <div className="message">
                <ul>
                  <li>
                    <br />
                    {item.message.query}
                  </li>
                  <li>
                    <strong>
                      Before proceeding u should know this prerequisite
                      Knowledge.
                    </strong>
                    <br />
                    <div
                      className="quill-content"
                      dangerouslySetInnerHTML={{
                        __html: convertDeltaToHtml(item.message.prerequisite),
                      }}
                    />
                  </li>
                  <li>
                    <strong>Here is the question that makes u think.</strong>
                    <br />
                    <div
                      className="quill-content"
                      dangerouslySetInnerHTML={{
                        __html: convertDeltaToHtml(item.message.question),
                      }}
                    />
                  </li>
                  <li>
                    <strong>U have tried right lets see its history.</strong>
                    <br />
                    <div
                      className="quill-content"
                      dangerouslySetInnerHTML={{
                        __html: convertDeltaToHtml(item.message.history),
                      }}
                    />
                  </li>
                  <li>
                    <strong>
                      Now u are ready to learn but before that have a look on
                      this anology.
                    </strong>
                    <br />
                    <div
                      className="quill-content"
                      dangerouslySetInnerHTML={{
                        __html: convertDeltaToHtml(item.message.analogy),
                      }}
                    />
                  </li>
                  <li>
                    <strong>And here is the actual Explanation.</strong>
                    <br />
                    <div
                      className="quill-content"
                      dangerouslySetInnerHTML={{
                        __html: convertDeltaToHtml(item.message.explanation),
                      }}
                    />
                  </li>
                </ul>
              </div>
              <div className="post-footer">
                <div className="likes-section">
                  <button
                    onClick={() => handleLike(item._id)}
                    className="like-button"
                  >
                    <FaThumbsUp />
                  </button>
                  <p> {item.noOfLikes}</p>
                </div>
                <div className="user-info">
                  <p>Answered by {item.username}</p>
                  <p>on {new Date(item.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div class="spacer"></div>
    </>
  );
};

export default SearchResultPage;
