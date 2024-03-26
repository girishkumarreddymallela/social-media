import React, { useState, useEffect, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../utils/FirebaseConfig";
import axios from "axios";

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlM, setImageUrlM] = useState(null);
  const fileInput = useRef(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, "UserProfileImages/" + file.name);

    try {
      const snapshot = await uploadBytesResumable(storageRef, file);
      console.log(snapshot);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      setImageUrlM("UserProfileImages/" + file.name);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (imageUrl && imageUrlM) {
      // Get username from local storage
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");

      // Prepare the data
      const data = {
        username: username,
        imageurl: imageUrl,
        imageurlM: imageUrlM,
      };

      // Prepare the config
      const config = {
        method: "post",
        url: "http://localhost:5000/userdata/pic/post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      // Send the data to the backend
      try {
        const response = axios(config);
        console.log(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  }, [imageUrl, imageUrlM]);

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUpload;
