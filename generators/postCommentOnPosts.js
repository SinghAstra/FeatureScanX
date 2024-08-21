import axios from "axios";

const baseURL = "http://localhost:5000/api";
const commonPassword = "YourCommonPassword123";
const maxCommentPerPost = 5;

const commentsText = [
  "Great post!",
  "Loved this one!",
  "Amazing content!",
  "Keep up the good work!",
  "Interesting perspective!",
  "Nice post!",
  "Well said!",
  "I totally agree with this.",
  "Great view!",
  "Thanks for sharing!",
  "Very insightful!",
  "I learned something new today.",
  "Keep the posts coming!",
  "This is so true.",
  "Incredible!",
  "Such a thoughtful post.",
  "Nicely written.",
  "Well put!",
  "This is very helpful.",
  "Totally relatable.",
  "This is exactly what I needed.",
  "You always post great stuff!",
  "Brilliant thoughts!",
  "Love the way you explained this.",
  "Thanks for your insight!",
  "This is so inspiring!",
  "Wow, that’s deep!",
  "This made my day.",
  "Completely agree!",
  "Your content is always top-notch.",
  "Very well said.",
  "Perfectly explained.",
  "This is pure gold!",
  "I appreciate this post.",
  "Great perspective on this.",
  "A unique way of looking at things!",
  "You nailed it!",
  "Really made me think!",
  "I love this viewpoint.",
  "Very thoughtful.",
  "This is on point!",
  "So informative!",
  "Couldn’t agree more.",
  "Thanks for the clarification.",
  "This post is fantastic.",
  "This really resonated with me.",
  "You’ve got a great point.",
  "I love the way you write.",
  "Amazing insight!",
  "This is such a great post!",
  "So much wisdom here.",
  "This was very useful.",
  "Excellent post!",
  "Really valuable content.",
  "This is incredibly insightful!",
  "Very good explanation.",
  "Nicely done.",
  "Appreciate the honesty here.",
  "This is eye-opening.",
  "That was an interesting read.",
  "I really enjoyed this.",
  "Well articulated!",
  "Thanks for your input.",
  "This post is a gem!",
  "I needed to hear this today.",
  "Thanks for the motivation!",
  "You always provide great content.",
  "This is really uplifting!",
  "This is awesome!",
  "A much-needed perspective.",
  "Very motivating!",
  "I admire your thoughts.",
  "This hit home for me.",
  "Clear and concise.",
  "You always inspire!",
  "I couldn't have said it better.",
  "Thanks for the advice!",
  "I love the energy here.",
  "This made me smile.",
  "You bring a fresh perspective!",
  "I really appreciate this content.",
  "Such a refreshing post!",
  "This is truly amazing.",
  "Always a good read!",
  "Really well written.",
  "This added so much value.",
  "I’m saving this post for later.",
  "This is so important.",
  "Your posts never disappoint!",
  "This brightened my day.",
  "So well said.",
  "This is powerful.",
  "Simply brilliant!",
  "This post speaks volumes.",
  "I feel so inspired!",
  "You’re always on point!",
  "This is super useful.",
  "Thanks for your thoughts!",
  "This is spot on!",
  "Your perspective is refreshing.",
  "Great job on this post.",
  "I always look forward to your posts.",
  "This is exactly what I needed to read.",
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

async function fetchAllPosts() {
  try {
    const response = await axios.get(`${baseURL}/posts/get-all-posts`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch posts:", error.message);
    return [];
  }
}

async function postCommentOnPost(token, postId, commentText, userName) {
  try {
    await axios.post(
      `${baseURL}/comments/${postId}`,
      { commentText },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    console.log(
      `Comment posted on post ${postId}: "${commentText} by ${userName}"`
    );
  } catch (error) {
    console.error(`Failed to post comment on post ${postId}:`, error);
  }
}

// Main script execution
const main = async () => {
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

    const posts = await fetchAllPosts();
    if (posts.length === 0) {
      console.log("No posts found. Exiting script.");
      return;
    }

    for (let post of posts) {
      const numComments = getRandomNumber(1, maxCommentPerPost);

      for (let i = 0; i < numComments; i++) {
        const randomComment =
          commentsText[getRandomNumber(0, commentsText.length - 1)];

        await postCommentOnPost(
          token,
          post._id,
          randomComment,
          currentUser.userName
        );
      }
    }
  }
};

main();
