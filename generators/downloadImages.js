import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import imageUrls from "./imageUrls.json" assert { type: "json" };

const downloadImage = async (url, filename) => {
  const writer = fs.createWriteStream(
    path.join(__dirname + "/assets", filename)
  );
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const downloadAllImages = async () => {
  for (const [index, url] of imageUrls.entries()) {
    const filename = `image${index + 1}.jpg`;
    try {
      await downloadImage(url, filename);
      console.log(`Downloaded ${filename}`);
    } catch (error) {
      console.log(`Failed to download ${url}:`, error.message);
    }
  }
};

downloadAllImages();
