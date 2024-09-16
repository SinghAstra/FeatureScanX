import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const IMAGE_COUNT = 1000;
const FILE_PATH = "imageUrls.json";

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
  const newUrls = await fetchImageUrls();

  let existingUrls = [];
  if (fs.existsSync(FILE_PATH)) {
    const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
    existingUrls = JSON.parse(fileContent);
  }

  const allUrls = [...existingUrls, ...newUrls];
  fs.writeFileSync(FILE_PATH, JSON.stringify(allUrls, null, 2));

  console.log("Appended new image URLs to imageUrls.json");
};

saveImageUrls();
