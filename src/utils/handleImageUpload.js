import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./FirebaseConfig";
import axios from "axios";

async function handleImageUpload(event) {
  const file = event.target.files[0];
  const storageRef = ref(storage, "UserProfileImages/" + file.name);
  let imageUrl, imageUrlM, dataerror;

  try {
    const snapshot = await uploadBytesResumable(storageRef, file);
    console.log(snapshot);
    const url = await getDownloadURL(snapshot.ref);
    imageUrl = url;
    imageUrlM = "UserProfileImages/" + file.name;
  } catch (error) {
    console.error("Error uploading file:", error);
    dataerror = error;
  }

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
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }

  return { imageUrl, imageUrlM, dataerror };
}
export { handleImageUpload };
