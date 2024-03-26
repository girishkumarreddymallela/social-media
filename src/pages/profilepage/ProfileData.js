// Profile.js
import React, { useState, useRef } from "react";
import "./ProfileData.css";
import userAvatar from "./user.jpeg";
import Navigation from "../../components/Navbar";
import axios from "axios";
import { useEffect } from "react";
import { handleImageUpload } from "../../utils/handleImageUpload";
function ProfileData() {
  // State variables for user information
  const [name, setName] = useState("your name");
  const [dob, setDob] = useState("your DOB");
  const [education, setEducation] = useState("your education");
  const [interests, setInterests] = useState("your interests");
  const [address, setAddress] = useState("your address");
  const [userAvatar1, setuserAvatar1] = useState(userAvatar);

  // State variable for edit mode
  const [edit, setEdit] = useState(false);
  const fileInput = useRef(null);
  //useeffect to fetch user  data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const config = {
        method: "get",
        url: "https://social-media-app-sandy-one.vercel.app/userdata/data/send",
        // url: "http://localhost:5000/userdata/data/send",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios(config);

        if (response.status === 200) {
          const data = response.data;
          setName(data.Name || "your name");
          setDob(data.Date_of_birth || "your DOB");
          setEducation(data.Education || "your education");
          setInterests(data.Interests || "your interests");
          setAddress(data.Address || "your address");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  //useeffect to fetch user  pic  data
  useEffect(() => {
    const fetchPicData = async () => {
      const token = localStorage.getItem("token");

      const config = {
        method: "get",
        url: "http://localhost:5000/userdata/Pic/send",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios(config);

        if (response.status === 200) {
          const data = response.data;
          setuserAvatar1(data.imageurl);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPicData();
  }, []);
  //handling onclickupload
  const onClickUpload = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  //handle file change
  const handleFileChange = async (event) => {
    if (event.target.files.length > 0) {
      const imagedata = await handleImageUpload(event);
      if (imagedata.dataerror) {
        alert("please use profile less than 1MB");
      } else {
        setuserAvatar1(imagedata.imageUrl);
      }
    }
  };

  // Handler functions for input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleInterestsChange = (e) => {
    setInterests(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Handler function for edit button
  const handleEdit = () => {
    setEdit(true);
  };

  /// Function to handle save
  const handleSave = async () => {
    // Retrieve username from local storage
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    // Config for axios request
    const config = {
      method: "post",
      url: "http://localhost:5000/userdata/data/post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        username: username,
        Name: name,
        Date_of_birth: dob,
        Education: education,
        Interests: interests,
        Address: address,
      },
    };

    try {
      // Sending data to the backend
      const response = await axios(config);

      if (response.status === 201) {
        // If response status is 201, set edit to false
        setEdit(false);
      }
    } catch (error) {
      // If there is an error, show an error message
      alert(
        "Your data is not registered in the database. Please try after some time."
      );
    }
  };

  return (
    <>
      <Navigation />
      <br />

      <div className="B0">
        <div className="B1B1">
          <div className="B2B2">
            <img src={userAvatar1} alt="profile" className="B3" />
          </div>
          <div className="B4B4">
            <button className="B5" onClick={onClickUpload}>
              Upload
            </button>
          </div>
        </div>
        <div className="B8">
          <div className="B9">
            <label className="B10">Name:</label>
            {edit ? (
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="B11"
              />
            ) : (
              <span className="B12">{name}</span>
            )}
          </div>
          <div className="B13">
            <label className="B14">Date of birth:</label>
            {edit ? (
              <input
                type="date"
                value={dob}
                onChange={handleDobChange}
                placeholder="Enter your date of birth"
                className="B15"
              />
            ) : (
              <span className="B16">{dob}</span>
            )}
          </div>
          <div className="B17">
            <label className="B18">Education:</label>
            {edit ? (
              <input
                type="text"
                value={education}
                onChange={handleEducationChange}
                placeholder="Enter your education"
                className="B19"
              />
            ) : (
              <span className="B20">{education}</span>
            )}
          </div>
          <div className="B21">
            <label className="B22">Interests:</label>
            {edit ? (
              <input
                type="text"
                value={interests}
                onChange={handleInterestsChange}
                placeholder="Enter your interests"
                className="B23"
              />
            ) : (
              <span className="B24">{interests}</span>
            )}
          </div>
          <div className="B25">
            <label className="B26">Address:</label>
            {edit ? (
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter your address"
                className="B27"
              />
            ) : (
              <span className="B28">{address}</span>
            )}
          </div>
          <div className="B29">
            {edit ? (
              <button className="B30" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button className="B31" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default ProfileData;
