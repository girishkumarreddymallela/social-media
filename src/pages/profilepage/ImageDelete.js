// Delete.js
import React from "react";
import storage from "../utils/FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";

function ImageDelete() {
  const handleDeleteImage = async (imageRef) => {
    const storageRef = ref(storage, imageRef);

    try {
      const snapshot = await deleteObject(storageRef);

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      {/* ... */}
      <button
        onClick={() => handleDeleteImage("UserProfileImages/delete.small.png")}
      >
        Delete Image
      </button>
    </div>
  );
}

export default ImageDelete;
