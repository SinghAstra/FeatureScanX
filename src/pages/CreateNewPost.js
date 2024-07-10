import React, { useState } from "react";
import "../styles/CreateNewPost.css";
import CreatePostDialog from "./CreatePostDialog";

const CreateNewPost = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log("isDialogOpen is ", isDialogOpen);

  const handleCreatePost = (post) => {
    console.log("New Post:", post);
    // Here you would typically make an API call to save the post to the backend
  };

  return (
    <div className="create-new-post">
      <button onClick={() => setIsDialogOpen(true)}>Create New Post</button>
      <CreatePostDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
};

export default CreateNewPost;
