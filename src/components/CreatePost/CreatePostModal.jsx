import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import "../../styles/CreatePostModal.css";
import AddCaptionModal from "./AddCaptionModal";
import SelectMediaModal from "./SelectMediaModal";

const CreatePostModal = ({ modalShown, setModalShown }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    caption: "",
    location: "",
    mediaFiles: [],
  });
  const [mediaPreview, setMediaPreview] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleNext = () => {
    setCurrentStage(2);
  };

  const handleBack = () => {
    setCurrentStage(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMediaChange = (files) => {
    const previews = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setMediaPreview(previews);
    setFormData((prevData) => ({ ...prevData, mediaFiles: files }));
  };

  const createPostFormData = () => {
    const postData = new FormData();
    postData.append("caption", formData.caption);
    postData.append("location", formData.location);

    // Append each file individually with the key "media"
    for (let i = 0; i < formData.mediaFiles.length; i++) {
      postData.append("media", formData.mediaFiles[i]);
    }

    return postData;
  };

  const uploadPost = async (postData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/posts/create-post`,
        postData,
        {
          withCredentials: true,
        }
      );

      console.log("response.data --uploadPost is :", response.data);
    } catch (error) {
      console.log("error --uploadPost is :", error);
    }
  };

  const resetPost = () => {
    setModalShown(false);
    setCurrentStage(1);
    setFormData({
      caption: "",
      location: "",
      mediaFiles: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = createPostFormData();
    uploadPost(postData);
    resetPost();
  };

  useTitle("Create New Post • Social UI");

  return (
    <>
      {modalShown && currentStage === 1 && (
        <SelectMediaModal
          handleMediaChange={handleMediaChange}
          onNext={handleNext}
          setModalShown={setModalShown}
        />
      )}
      {modalShown && currentStage === 2 && (
        <AddCaptionModal
          mediaPreview={mediaPreview}
          formData={formData}
          handleChange={handleChange}
          onBack={handleBack}
          onSubmit={handleSubmit}
          setModalShown={setModalShown}
        />
      )}
    </>
  );
};

CreatePostModal.propTypes = {
  modalShown: PropTypes.bool.isRequired,
  setModalShown: PropTypes.func.isRequired,
};

export default CreatePostModal;
