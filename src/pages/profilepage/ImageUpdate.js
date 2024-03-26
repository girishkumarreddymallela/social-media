import React, { useState } from "react";
import storage from "../../utils/FirebaseConfig";
import {
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

function ImageUpdate() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const storageRef = ref(storage, "UserProfileImages/" + file.name);

    try {
      // Upload the new image
      const snapshot = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
      console.log("File updated successfully");

      // Delete the old image
      await deleteObject(ref(storage, "UserProfileImages/delete.small.png"));
      console.log("Old image deleted successfully");
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Updated" />}
      <h1>update image </h1>
    </div>
  );
}

export default ImageUpdate;
