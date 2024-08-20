import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const IMAGE_COUNT = 10;

const fetchImageUrls = async () => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        count: IMAGE_COUNT,
        client_id: UNSPLASH_ACCESS_KEY,
      },
    });
    return response.data.map((image) => image.urls.full);
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return [];
  }
};

const saveImageUrls = async () => {
  const urls = await fetchImageUrls();
  fs.writeFileSync("imageUrls.json", JSON.stringify(urls, null, 2));
  console.log("Saved image URLs to imageUrls.json");
};

saveImageUrls();
