import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const baseURL = "http://localhost:5000/api";
const commonPassword = "YourCommonPassword123";
const maxImagePerPost = 4;
const maxPostsPerUser = 5;
const maxHashTagsPerPost = 5;
const maxMentionsPerPost = 5;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imageDirectory = path.join(__dirname, "assets");

const captionsText = [
  "Enjoying the sunshine!",
  "A day well spent at the beach.",
  "Nature at its best.",
  "Morning coffee vibes.",
  "Exploring the city.",
  "Captured a beautiful moment.",
  "Life is better with friends.",
  "Adventures in the mountains.",
  "Sunset serenity.",
  "A peaceful day in the park.",
  "Chasing dreams.",
  "The sky is the limit.",
  "Making memories.",
  "A perfect day!",
  "Living the good life.",
  "Lost in the moment.",
  "Sunshine and good vibes.",
  "Happiness is homemade.",
  "Wanderlust and city dust.",
  "Simple joys of life.",
  "Unforgettable moments.",
  "Taking the scenic route.",
  "Blissful and blessed.",
  "Grateful for today.",
  "Every picture tells a story.",
  "Life is an adventure.",
  "Living life in full bloom.",
  "A breath of fresh air.",
  "Serenity now.",
  "Creating my own sunshine.",
  "Feeling alive!",
  "Soaking up the views.",
  "Enjoying the simple things.",
  "Here and now.",
  "Making every moment count.",
  "Captured in the moment.",
  "Sun-kissed and blessed.",
  "The best is yet to come.",
  "Moments like these.",
  "Good times and tan lines.",
  "Let’s wander where the Wi-Fi is weak.",
  "Sunshine and smiles.",
  "Collecting moments, not things.",
  "Today’s mood: Relaxed.",
  "On top of the world.",
  "Love this view!",
  "Peace, love, and sunshine.",
  "Finding beauty in simplicity.",
  "Every sunset has a story.",
  "In the heart of nature.",
  "A walk in the woods.",
  "Mountains are calling.",
  "Another day, another adventure.",
  "On cloud nine.",
  "Chasing the horizon.",
  "Here’s to the nights we won’t remember with the friends we’ll never forget.",
  "A little slice of paradise.",
  "Not all who wander are lost.",
  "Just another day in paradise.",
  "Nature’s canvas.",
  "Living for these moments.",
  "The world is my playground.",
  "Sunsets and palm trees.",
  "Exploring new horizons.",
  "In my happy place.",
  "Find me under the palms.",
  "Living in the moment.",
  "Just keep swimming.",
  "Adventure awaits.",
  "Take only pictures, leave only footprints.",
  "Living for the weekends.",
  "The great outdoors.",
  "Taking the road less traveled.",
  "Dream big, travel far.",
  "Living my best life.",
  "Sandy toes, sun-kissed nose.",
  "Let the adventures begin.",
  "Catching flights, not feelings.",
  "Savoring the moment.",
  "Waves and sunshine.",
  "Saltwater therapy.",
  "Weekend vibes.",
  "The ocean is calling.",
  "On island time.",
  "Keep it simple.",
  "Finding peace in the chaos.",
  "Good vibes only.",
  "A day to remember.",
  "Endless summer.",
  "Making waves.",
  "Follow your bliss.",
  "Living on the edge.",
  "Forever chasing sunsets.",
  "Seas the day!",
  "Finding myself in nature.",
  "My kind of paradise.",
  "Take me to the mountains.",
  "Lost but loving it.",
  "Find your wild.",
  "Fresh air and freedom.",
  "Nature never goes out of style.",
];
const locations = [
  "Central Park, New York",
  "Golden Gate Bridge, San Francisco",
  "Eiffel Tower, Paris",
  "Bondi Beach, Sydney",
  "Niagara Falls, Canada",
  "Tokyo Tower, Tokyo",
  "Santorini, Greece",
  "Machu Picchu, Peru",
  "Great Wall of China, Beijing",
  "Colosseum, Rome",
  "Times Square, New York",
  "Hollywood Sign, Los Angeles",
  "Mount Fuji, Japan",
  "Sydney Opera House, Australia",
  "Big Ben, London",
  "Statue of Liberty, New York",
  "Louvre Museum, Paris",
  "Grand Canyon, Arizona",
  "Stonehenge, England",
  "Victoria Falls, Zimbabwe",
  "Christ the Redeemer, Rio de Janeiro",
  "Sagrada Familia, Barcelona",
  "Petra, Jordan",
  "Taj Mahal, India",
  "Banff National Park, Canada",
  "Burj Khalifa, Dubai",
  "Blue Lagoon, Iceland",
  "Great Barrier Reef, Australia",
  "Yellowstone National Park, USA",
  "Table Mountain, South Africa",
  "Mount Kilimanjaro, Tanzania",
  "Pyramids of Giza, Egypt",
  "Angel Falls, Venezuela",
  "Venice Canals, Italy",
  "Banff Springs, Canada",
  "Lake Louise, Canada",
  "Cliffs of Moher, Ireland",
  "Serengeti National Park, Tanzania",
  "Uluru, Australia",
  "Hagia Sophia, Turkey",
  "Cinque Terre, Italy",
  "Lake Tahoe, USA",
  "Reykjavik, Iceland",
  "Mount Everest, Nepal",
  "Loch Ness, Scotland",
  "The Maldives",
  "The Amazon Rainforest, Brazil",
  "Zion National Park, USA",
  "Santorini Caldera, Greece",
  "Tulum, Mexico",
  "Palawan, Philippines",
  "Maui, Hawaii",
  "Morocco, Sahara Desert",
  "Patagonia, Argentina",
  "Mount Rushmore, USA",
  "Glacier National Park, USA",
  "Death Valley, USA",
  "Mont Saint-Michel, France",
  "Cinque Terre, Italy",
  "Yosemite National Park, USA",
  "Istanbul, Turkey",
  "Swiss Alps, Switzerland",
  "Rocky Mountains, Canada",
  "Kruger National Park, South Africa",
  "Amalfi Coast, Italy",
  "Plitvice Lakes, Croatia",
  "Galapagos Islands, Ecuador",
  "Florence, Italy",
  "Tuscany, Italy",
  "New Zealand Fiordland",
  "Lapland, Finland",
  "Matterhorn, Switzerland",
  "Scotland Highlands",
  "Himalayas, Nepal",
  "Antelope Canyon, USA",
  "Blue Ridge Parkway, USA",
  "Gobi Desert, Mongolia",
  "Chichen Itza, Mexico",
  "Horseshoe Bend, USA",
  "Death Road, Bolivia",
  "Komodo Island, Indonesia",
  "Amazon Basin, Brazil",
  "Cappadocia, Turkey",
  "Bora Bora, French Polynesia",
  "Franz Josef Glacier, New Zealand",
  "Sossusvlei, Namibia",
  "Namib Desert, Namibia",
  "Victoria Falls, Zambia",
  "Kakadu National Park, Australia",
  "The Blue Mountains, Australia",
  "Mount Cook, New Zealand",
  "Gullfoss, Iceland",
  "The Blue Mosque, Turkey",
  "Bali, Indonesia",
  "Chernobyl, Ukraine",
  "The Dead Sea, Jordan",
  "The Danube River, Europe",
  "Norwegian Fjords, Norway",
  "Ayers Rock, Australia",
];
const hashtags = [
  "#photography",
  "#travel",
  "#nature",
  "#art",
  "#instagood",
  "#love",
  "#photooftheday",
  "#fashion",
  "#beautiful",
  "#happy",
  "#picoftheday",
  "#cute",
  "#followme",
  "#like4like",
  "#follow",
  "#selfie",
  "#summer",
  "#friends",
  "#instadaily",
  "#fun",
  "#smile",
  "#food",
  "#igers",
  "#style",
  "#travelgram",
  "#beauty",
  "#girl",
  "#photo",
  "#me",
  "#sunset",
  "#fitness",
  "#repost",
  "#instalike",
  "#explore",
  "#adventure",
  "#music",
  "#beach",
  "#ootd",
  "#amazing",
  "#vintage",
  "#wanderlust",
  "#inspiration",
  "#artwork",
  "#sky",
  "#naturelovers",
  "#sun",
  "#landscape",
  "#bestoftheday",
  "#life",
  "#instagram",
  "#follow4follow",
  "#travelphotography",
  "#photographer",
  "#motivation",
  "#design",
  "#lifestyle",
  "#streetstyle",
  "#model",
  "#quotes",
  "#happiness",
  "#luxury",
  "#workout",
  "#mindfulness",
  "#architecture",
  "#fitnessmotivation",
  "#color",
  "#handmade",
  "#blackandwhite",
  "#dog",
  "#loveit",
  "#peace",
  "#instamood",
  "#exploremore",
  "#adventuretime",
  "#influencer",
  "#tbt",
  "#instapic",
  "#portrait",
  "#weekend",
  "#healthy",
  "#yoga",
  "#followforfollow",
  "#naturephotography",
  "#instafood",
  "#sustainable",
  "#family",
  "#city",
  "#designinspiration",
  "#minimalism",
  "#travelblogger",
  "#cozy",
  "#wellness",
  "#fashionblogger",
  "#beachlife",
  "#positivity",
  "#success",
  "#makeup",
  "#coffee",
  "#mountains",
  "#creative",
  "#streetphotography",
  "#goodvibes",
  "#healthyfood",
  "#new",
  "#exploring",
  "#dream",
  "#inspire",
  "#architecturephotography",
  "#motivationmonday",
  "#fitnessjourney",
  "#vegan",
  "#instagood",
  "#sunshine",
  "#traveladdict",
  "#veganfood",
  "#lifequotes",
  "#summerdays",
  "#bestfriends",
  "#climatechange",
  "#beachvibes",
  "#ocean",
  "#handcrafted",
  "#mindset",
  "#mountainview",
  "#positivevibes",
  "#mindfulliving",
  "#wildlife",
  "#earth",
  "#artsy",
  "#designlife",
  "#foodie",
  "#nomnom",
  "#indie",
  "#boho",
  "#streetart",
  "#dogsofinstagram",
  "#fishing",
  "#yogaeverydamnday",
  "#roamtheplanet",
  "#instatravel",
  "#landscapephotography",
  "#nomad",
  "#goodmorning",
  "#peaceful",
  "#bohemian",
  "#dreamer",
  "#ecofriendly",
  "#workoutmotivation",
  "#urban",
  "#pastel",
  "#midcenturymodern",
  "#creativeprocess",
  "#sunkissed",
  "#colorful",
  "#camping",
  "#simpleliving",
  "#instahappy",
  "#meditation",
  "#noexcuses",
  "#gardening",
  "#caffeine",
  "#hiking",
  "#detox",
  "#homecooking",
  "#intentionalliving",
  "#explorepage",
  "#bossbabe",
  "#mood",
  "#freedom",
  "#lifeisgood",
  "#vibes",
  "#fitfam",
  "#mindfullife",
  "#wildlifephotography",
  "#localbusiness",
  "#selflove",
  "#eco",
  "#handmadejewelry",
  "#yogalife",
  "#artofvisuals",
  "#homedecor",
  "#entrepreneur",
  "#wanderer",
  "#instacool",
  "#artlovers",
  "#shoplocal",
  "#veganlife",
  "#instafun",
  "#retro",
  "#dessert",
  "#tropical",
  "#sunnyday",
  "#happyplace",
  "#exploreeverything",
  "#landscapelovers",
  "#makersgonnamake",
  "#slowfashion",
  "#digitalnomad",
  "#instabeauty",
  "#holidays",
  "#inspiredaily",
  "#adventurers",
  "#farmtotable",
  "#booklover",
  "#recycle",
  "#earthday",
  "#handcrafted",
  "#streetwear",
  "#cleaneating",
  "#flowerpower",
  "#fashionista",
  "#citylife",
  "#instafashion",
  "#pastels",
  "#instacreative",
  "#retroaesthetic",
  "#coffeeshop",
  "#fallvibes",
  "#instadaily",
  "#explorer",
  "#crystals",
  "#sustainableliving",
  "#beachday",
  "#outdoorlife",
  "#fitlife",
  "#nomadiclife",
  "#naturelover",
  "#quoteoftheday",
  "#selfgrowth",
  "#climbing",
  "#clearsky",
  "#instafit",
  "#beachy",
  "#photographylovers",
  "#instalove",
];

let usedImages = new Set();

async function getAllUsers() {
  try {
    const response = await axios.get(`${baseURL}/users/get-all-users`);
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error.message);
    return [];
  }
}

async function loginUser(email) {
  try {
    const response = await axios.post(
      `${baseURL}/auth/login`,
      { email, password: commonPassword },
      { withCredentials: true }
    );
    const cookies = response.headers["set-cookie"];
    const tokenCookie = cookies?.find((cookie) => cookie.startsWith("token="));
    if (!tokenCookie) {
      throw new Error("Token not found in cookies");
    }
    const token = tokenCookie.split(";")[0].replace("token=", "");
    return token;
  } catch (error) {
    console.log(`Error logging in user ${email}:`, error.message);
    return null;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAvailableImage() {
  const images = fs
    .readdirSync(imageDirectory)
    .filter((file) => !usedImages.has(file));
  if (images.length === 0) {
    throw new Error("No available images left to upload.");
  }
  const randomIndex = getRandomNumber(0, images.length - 1);
  const selectedImage = images[randomIndex];
  usedImages.add(selectedImage);
  return selectedImage;
}

async function createPost(caption, location, token, imagePaths, username) {
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("location", location);

  imagePaths.forEach((imagePath) => {
    formData.append("media", fs.createReadStream(imagePath));
  });

  try {
    await axios.post(`${baseURL}/posts/create-post`, formData, {
      headers: {
        ...formData.getHeaders(),
        Cookie: `token=${token}`,
      },
    });

    const imageNames = imagePaths
      .map((imagePath) => path.basename(imagePath))
      .join(", ");
    console.log(`Post created with images: ${imageNames} by ${username}`);
  } catch (error) {
    const imageNames = imagePaths
      .map((imagePath) => path.basename(imagePath))
      .join(", ");
    console.log(
      `Error creating post with images: ${imageNames}:`,
      error.message
    );
  }
}

async function automatePostCreation() {
  const users = await getAllUsers();
  if (users.length === 0) {
    console.log("No users to process.");
    return;
  }

  for (const currentUser of users) {
    const token = await loginUser(currentUser.email);
    if (!token) {
      console.log(`Skipping ${currentUser.userName} due to login failure.`);
      continue;
    }

    const numberOfPosts = getRandomNumber(1, maxPostsPerUser);
    for (let i = 0; i < numberOfPosts; i++) {
      try {
        const isSingleImagePost = Math.random() < 0.7;
        let imagePaths = [];

        if (isSingleImagePost) {
          imagePaths.push(path.join(imageDirectory, getAvailableImage()));
        } else {
          const numberOfImages = getRandomNumber(2, maxImagePerPost);
          for (let j = 0; j < numberOfImages; j++) {
            imagePaths.push(path.join(imageDirectory, getAvailableImage()));
          }
        }

        let hashTags = " ";
        const numberOfHashTags = getRandomNumber(0, maxHashTagsPerPost);
        for (let i = 0; i < numberOfHashTags; i++) {
          hashTags += hashtags[getRandomNumber(0, hashTags.length)] + " ";
        }

        let mentions = " ";
        let numberOfMentions = getRandomNumber(0, maxMentionsPerPost);
        for (let i = 0; i < numberOfMentions; i++) {
          mentions +=
            "@" + users[getRandomNumber(0, users.length - 1)].userName + " ";
        }

        const caption =
          captionsText[getRandomNumber(0, captionsText.length - 1)] +
          hashTags +
          mentions;

        const location = locations[getRandomNumber(0, locations.length - 1)];
        await createPost(
          caption,
          location,
          token,
          imagePaths,
          currentUser.userName
        );
      } catch (error) {
        console.log("Error in post creation:", error.message);
      }
    }
  }
}

automatePostCreation();
