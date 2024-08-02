import { faker } from "@faker-js/faker";
import axios from "axios";

const API_URL = "http://localhost:5000/posts/new-post";
const NUM_POSTS = 10;

const createPost = async () => {
  for (let i = 0; i < NUM_POSTS; i++) {
    // Generate random data
    const location = faker.location.country();
    const description = faker.lorem.sentences();
    const picturePath = faker.image.url();

    try {
      const response = await axios.post(API_URL, {
        location,
        description,
        picturePath,
      });
      console.log(`Post ${i + 1} created:`, response.data);
    } catch (error) {
      console.log(
        `Error creating post ${i + 1}:`,
        error.response?.data?.message || error.message
      );
    }
  }
};

createPost();
