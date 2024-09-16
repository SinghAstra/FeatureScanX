import axios from "axios";

const baseURL = "http://localhost:5000/api";
const commonPassword = "YourCommonPassword123";

async function getAllUsers() {
  try {
    const response = await axios.get(`${baseURL}/users/get-all-users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
}

// Function to login the user and get the JWT token
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

// Function to fetch all posts
async function fetchAllPosts() {
  try {
    const response = await axios.get(`${baseURL}/posts/get-all-posts`);
    return response.data;
  } catch (error) {
    console.log("Error fetching posts:", error.message);
    return [];
  }
}

// Function to toggle like on a post
async function likePost(postId, token, username) {
  try {
    await axios.get(`${baseURL}/posts/${postId}/like`, {
      headers: { Cookie: `token=${token}` },
      withCredentials: true,
    });
    console.log(`Liked/un-liked post ${postId} by ${username}`);
  } catch (error) {
    console.log(`Error liking post ${postId}:`, error.message);
  }
}

// Main function to like posts with 50% chance of liking or skipping
async function likePosts() {
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

    for (const post of posts) {
      if (Math.random() < 0.5) {
        await likePost(post._id, token, currentUser.userName);
      } else {
        console.log(
          `Skipped liking post ${post._id} by ${currentUser.userName}`
        );
      }
    }
  }
}

likePosts();
